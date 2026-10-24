import type { CollectionConfig } from "payload"
import { appUserCreate, ownerOrAdmin, setOwner } from "./ownership"

// One document per app user: the full saved trainer state, kept with revision
// history so an accidental overwrite can be recovered from the admin.
export const TrainingData: CollectionConfig = {
  slug: "training-data",
  admin: { group: "App", defaultColumns: ["owner", "revision", "updatedAt"] },
  access: {
    create: appUserCreate,
    read: ownerOrAdmin,
    update: ownerOrAdmin,
    delete: ownerOrAdmin,
  },
  versions: { maxPerDoc: 30 },
  hooks: { beforeChange: [setOwner] },
  fields: [
    {
      name: "owner",
      type: "relationship",
      relationTo: "users",
      required: true,
      unique: true,
      index: true,
      access: { update: () => false },
      admin: { readOnly: true, position: "sidebar" },
    },
    {
      name: "revision",
      type: "number",
      required: true,
      defaultValue: 1,
      admin: { position: "sidebar" },
    },
    { name: "data", type: "json", required: true },
  ],
}
