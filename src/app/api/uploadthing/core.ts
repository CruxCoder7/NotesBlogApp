import { getServerSession } from "next-auth"
import { createUploadthing, type FileRouter } from "uploadthing/next"
import { authOptions } from "../auth/[...nextauth]/route"

const f = createUploadthing()

export const ourFileRouter = {
  imageUploader: f({ image: { maxFileSize: "4MB", maxFileCount: 1 } })
    .middleware(async () => {
      const session = await getServerSession(authOptions)
      console.log(session)
      if (!session) throw new Error("Unauthorized")
      return { email: session.user?.email }
    })
    .onUploadComplete(async ({ metadata, file }) => {
      console.log("Upload complete for userId:", metadata.email)
      console.log("file url", file.url)
    }),
} satisfies FileRouter

export type OurFileRouter = typeof ourFileRouter
