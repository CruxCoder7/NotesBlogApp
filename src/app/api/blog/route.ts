import { getServerSession } from "next-auth"
import { NextRequest, NextResponse } from "next/server"
import { authOptions } from "../auth/[...nextauth]/route"
import { posts } from "@prisma/client"
import { prisma } from "../../../db"

export async function POST(request: NextRequest, res: NextResponse) {
  const session = await getServerSession(authOptions)
  console.log(session)
  if (!session) throw new Error("Unauthorized")

  const data: posts = await request.json()

  const result = await prisma.posts.create({
    data: {
      title: data.title,
      content: data.content,
      images: data.images,
    },
  })

  return NextResponse.json({ result })
}
