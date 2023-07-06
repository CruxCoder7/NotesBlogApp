import { createUploadthing, type FileRouter } from "uploadthing/next"
import { getCurrentUser } from "../../../lib/session"

const f = createUploadthing()

export const ourFileRouter = {
  imageUploader: f({ image: { maxFileSize: "4MB", maxFileCount: 1 } })
    .middleware(async () => {
      const session = await getCurrentUser()
      if (!session) throw new Error("Unauthorized")
      return { email: session.user?.email }
    })
    .onUploadComplete(async ({ metadata, file }) => {
      console.log("Upload complete for userId:", metadata.email)
      console.log("file url", file.url)
    }),
} satisfies FileRouter

export type OurFileRouter = typeof ourFileRouter
