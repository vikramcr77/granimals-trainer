import { appAuth } from "@/lib/app-auth"

const json = (body: unknown, status = 200) => Response.json(body, { status })

export async function GET() {
  const user = await appAuth.currentUser()
  return json({ user: user ? { id: user.id, email: user.email } : null })
}

export async function POST(request: Request) {
  const body = (await request.json().catch(() => null)) as {
    action?: string
    email?: unknown
    password?: unknown
  } | null
  const action = body?.action
  if (action === "logout") {
    await appAuth.logout()
    return json({ user: null })
  }
  if (action !== "login" && action !== "signup")
    return json({ error: "Unknown action" }, 400)

  const email =
    typeof body?.email === "string" ? body.email.trim().toLowerCase() : ""
  const password = typeof body?.password === "string" ? body.password : ""
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email))
    return json({ error: "Enter a valid email address." }, 400)
  if (password.length < 8)
    return json({ error: "Password must be at least 8 characters." }, 400)

  try {
    const user =
      action === "signup"
        ? await appAuth.signup(email, password)
        : await appAuth.login(email, password)
    return json({ user: { id: user.id, email: user.email } })
  } catch (e) {
    const msg = e instanceof Error ? e.message : ""
    if (action === "signup" && /email|unique|already|invalid/i.test(msg))
      return json(
        { error: "An account with this email already exists. Try signing in." },
        409,
      )
    if (/locked/i.test(msg))
      return json({ error: "Too many attempts. Try again in 10 minutes." }, 429)
    if (action === "login")
      return json({ error: "Incorrect email or password." }, 401)
    return json(
      { error: "Could not create the account. Please try again." },
      500,
    )
  }
}
