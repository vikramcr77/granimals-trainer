import { appAuth, type AppUser } from "@/lib/app-auth"
import { getPayloadClient } from "@/lib/payload"

const json = (body: unknown, status = 200) => Response.json(body, { status })
const MAX_BYTES = 8 * 1024 * 1024

async function ownDoc(user: AppUser) {
  const payload = await getPayloadClient()
  const { docs } = await payload.find({
    collection: "training-data",
    where: { owner: { equals: user.id } },
    limit: 1,
    depth: 0,
    user,
    overrideAccess: false,
  })
  return { payload, doc: docs[0] ?? null }
}

export async function GET() {
  const user = await appAuth.currentUser()
  if (!user) return json({ error: "Signed out" }, 401)
  const { doc } = await ownDoc(user)
  return json({
    doc: doc
      ? { revision: doc.revision, data: doc.data, updatedAt: doc.updatedAt }
      : null,
  })
}

// Optimistic concurrency: a write is accepted only against the revision the
// device last saw, so one device can never silently overwrite another.
export async function PUT(request: Request) {
  const user = await appAuth.currentUser()
  if (!user) return json({ error: "Signed out" }, 401)
  const raw = await request.text()
  if (raw.length > MAX_BYTES) return json({ error: "Data too large" }, 413)
  let body: { data?: unknown, baseRev?: unknown }
  try {
    body = JSON.parse(raw)
  } catch {
    return json({ error: "Invalid JSON" }, 400)
  }
  const data = body.data
  if (!data || typeof data !== "object" || Array.isArray(data))
    return json({ error: "Invalid data" }, 400)
  const baseRev = typeof body.baseRev === "number" ? body.baseRev : 0

  const { payload, doc } = await ownDoc(user)
  if (!doc) {
    const created = await payload.create({
      collection: "training-data",
      data: {
        owner: user.id,
        revision: 1,
        data: data as Record<string, unknown>,
      },
      user,
      overrideAccess: false,
    })
    return json({ revision: created.revision })
  }
  if (doc.revision !== baseRev) {
    return json(
      {
        error: "conflict",
        doc: {
          revision: doc.revision,
          data: doc.data,
          updatedAt: doc.updatedAt,
        },
      },
      409,
    )
  }
  const updated = await payload.update({
    collection: "training-data",
    id: doc.id,
    data: { revision: doc.revision + 1, data: data as Record<string, unknown> },
    user,
    overrideAccess: false,
  })
  return json({ revision: updated.revision })
}
