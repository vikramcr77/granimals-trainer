import { appAuth } from "@/lib/app-auth"
import { getPayloadClient } from "@/lib/payload"

export async function GET() {
  const user = await appAuth.currentUser()
  if (!user) return Response.json({ error: "Signed out" }, { status: 401 })
  const payload = await getPayloadClient()
  const { docs } = await payload.find({
    collection: "scan-photos",
    where: { owner: { equals: user.id } },
    select: { scanId: true },
    pagination: false,
    depth: 0,
    user,
    overrideAccess: false,
  })
  return Response.json({ ids: docs.map((d) => d.scanId) })
}
