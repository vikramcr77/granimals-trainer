import type { Access, CollectionBeforeChangeHook } from "payload"

export const appUserCreate: Access = ({ req: { user } }) =>
  user?.collection === "users"

export const ownerOrAdmin: Access = ({ req: { user } }) => {
  if (user?.collection === "admins") return true
  if (user?.collection === "users") return { owner: { equals: user.id } }
  return false
}

// The owner always comes from the signed-in app user, never from the request body.
export const setOwner: CollectionBeforeChangeHook = ({
  data,
  req,
  operation,
}) => {
  if (operation === "create" && req.user?.collection === "users")
    data.owner = req.user.id
  return data
}
