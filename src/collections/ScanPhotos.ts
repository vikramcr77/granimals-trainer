import type { CollectionConfig } from "payload"
import { appUserCreate, ownerOrAdmin, setOwner } from "./ownership"

// Private body-scan photos, one per scan, stored as compact JPEG data URLs.
export const ScanPhotos: CollectionConfig = {
  slug: "scan-photos",
  admin: {
    useAsTitle: "scanId",
    group: "App",
    defaultColumns: ["scanId", "owner", "updatedAt"],
  },
  access: {
    create: appUserCreate,
    read: ownerOrAdmin,
    update: ownerOrAdmin,
    delete: ownerOrAdmin,
  },
  hooks: { beforeChange: [setOwner] },
  fields: [
    {
      name: "owner",
      type: "relationship",
      relationTo: "users",
      required: true,
      index: true,
      access: { update: () => false },
      admin: { readOnly: true, position: "sidebar" },
    },
    { name: "scanId", type: "text", required: true, index: true },
    {
      name: "image",
      type: "textarea",
      required: true,
      admin: { hidden: true },
    },
  ],
}
