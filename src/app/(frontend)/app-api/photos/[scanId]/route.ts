import { appAuth } from "@/lib/app-auth"
import { getPayloadClient } from "@/lib/payload"

const json = (body: unknown, status = 200) => Response.json(body, { status })
const MAX_CHARS = 6 * 1024 * 1024
const DATA_URL = /^data:image\/(jpeg|png|webp);base64,[A-Za-z0-9+/=]+$/

type Ctx = { params: Promise<{ scanId: string }> }

async function find(scanId: string) {
  const user = await appAuth.currentUser()
  if (!user) return null
  const payload = await getPayloadClient()
  const { docs } = await payload.find({
    collection: "scan-photos",
    where: {
      and: [{ owner: { equals: user.id } }, { scanId: { equals: scanId } }],
    },
    limit: 1,
    depth: 0,
    user,
    overrideAccess: false,
  })
  return { user, payload, doc: docs[0] ?? null }
}

export async function GET(_req: Request, { params }: Ctx) {
  const { scanId } = await params
  const r = await find(scanId)
  if (!r) return json({ error: "Signed out" }, 401)
  if (!r.doc) return json({ error: "Not found" }, 404)
  return json({ image: r.doc.image })
}

export async function PUT(request: Request, { params }: Ctx) {
  const { scanId } = await params
  if (!/^[\w-]{1,64}$/.test(scanId)) return json({ error: "Invalid id" }, 400)
  const body = (await request.json().catch(() => null)) as {
    image?: unknown
  } | null
  const image = body?.image
  if (
    typeof image !== "string" ||
    image.length > MAX_CHARS ||
    !DATA_URL.test(image)
  )
    return json({ error: "Invalid image" }, 400)
  const r = await find(scanId)
  if (!r) return json({ error: "Signed out" }, 401)
  const { payload, user, doc } = r
  if (doc) {
    await payload.update({
      collection: "scan-photos",
      id: doc.id,
      data: { image },
      user,
      overrideAccess: false,
    })
  } else {
    await payload.create({
      collection: "scan-photos",
      data: { owner: user.id, scanId, image },
      user,
      overrideAccess: false,
    })
  }
  return json({ ok: true })
}
