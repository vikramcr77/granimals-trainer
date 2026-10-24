import { cookies } from "next/headers"
import { getPayloadClient } from "./payload"
import type { User } from "@/payload-types"

const APP_SESSION = "app-session"

export type AppUser = User & { collection: "users" }

/**
 * App-user auth on its own HTTP-only `app-session` cookie, independent of the
 * Payload Admin session. Only that token is validated, and only identities
 * from the configured collection are accepted.
 */
export function createAppAuth(collection: "users") {
  async function setSession(token: string, maxAge: number) {
    ;(await cookies()).set(APP_SESSION, token, {
      httpOnly: true,
      secure: true,
      sameSite: "none", // the Make preview renders the app in an iframe
      path: "/",
      maxAge,
    })
  }

  async function login(email: string, password: string): Promise<AppUser> {
    const payload = await getPayloadClient()
    const result = await payload.login({
      collection,
      data: { email, password },
    })
    if (!result.token || !result.user) throw new Error("Login failed")
    const maxAge = result.exp
      ? Math.max(0, result.exp - Math.floor(Date.now() / 1000))
      : 60 * 60 * 24 * 90
    await setSession(result.token, maxAge)
    return { ...result.user as User, collection }
  }

  return {
    async currentUser(): Promise<AppUser | null> {
      const token = (await cookies()).get(APP_SESSION)?.value
      if (!token) return null
      const payload = await getPayloadClient()
      const authHeaders = new Headers({ Authorization: `JWT ${token}` })
      const { user } = await payload.auth({ headers: authHeaders })
      if (!user || user.collection !== collection) return null
      return user as unknown as AppUser
    },
    login,
    async signup(email: string, password: string) {
      const payload = await getPayloadClient()
      await payload.create({
        collection,
        data: { email, password },
        overrideAccess: false,
      })
      return login(email, password)
    },
    async logout() {
      await setSession("", 0)
    },
  }
}

export const appAuth = createAppAuth("users")
