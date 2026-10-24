import type { Access, CollectionConfig } from "payload"

// Public app accounts (separate from the Payload Admin `admins` collection).
const selfOrAdmin: Access = ({ req: { user } }) => {
  if (user?.collection === "admins") return true
  if (user?.collection === "users") return { id: { equals: user.id } }
  return false
}

export const Users: CollectionConfig = {
  slug: "users",
  admin: { useAsTitle: "email", group: "App" },
  auth: {
    tokenExpiration: 60 * 60 * 24 * 90, // stay signed in for 90 days
    maxLoginAttempts: 10,
    lockTime: 10 * 60 * 1000,
  },
  access: {
    admin: () => false,
    create: () => true,
    read: selfOrAdmin,
    update: selfOrAdmin,
    delete: selfOrAdmin,
  },
  fields: [],
}
