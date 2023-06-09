import { getServerSession } from "next-auth"
import { NextRequest, NextResponse } from "next/server"
import { posts } from "@prisma/client"
import { prisma } from "../../../db"
import { authOptions } from "../../../lib/session"

export async function POST(request: NextRequest, res: NextResponse) {
  const session = await getServerSession(authOptions)
  if (!session) throw new Error("Unauthorized")

  const data: posts = await request.json()

  const result = await prisma.posts.create({
    data: {
      title: data.title,
      content: data.content,
      image: data.image,
    },
  })

  return NextResponse.json({ result })
}
