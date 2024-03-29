import { getServerSession } from "next-auth"
import { NextRequest, NextResponse } from "next/server"
import { posts } from "@prisma/client"
import { prisma } from "../../../../db"
import { authOptions } from "../../../../lib/session"
import { utapi } from "uploadthing/server"

export async function POST(request: NextRequest, res: NextResponse) {
  const session = await getServerSession(authOptions)
  if (!session) throw new Error("Unauthorized")

  const data: posts = await request.json()

  if (data.image) {
    await utapi.deleteFiles(data.image.fileKey)
  }

  const result = await prisma.posts.delete({
    where: {
      id: data.id,
    },
  })

  return NextResponse.json({ result })
}
