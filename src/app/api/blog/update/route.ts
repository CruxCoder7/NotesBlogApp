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

  const input = Object.fromEntries(
    Object.entries(data).filter(([key]) => key !== "id")
  )

  if (data.image) {
    const val = await prisma.posts.findFirst({
      where: { id: data.id },
    })

    if (val && val.image) await utapi.deleteFiles(val?.image.fileKey)
  }

  const result = await prisma.posts.update({
    where: {
      id: data.id,
    },
    data: input,
  })

  return NextResponse.json({ result })
}
