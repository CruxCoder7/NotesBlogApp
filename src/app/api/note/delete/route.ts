import { getServerSession } from "next-auth"
import { NextRequest, NextResponse } from "next/server"
import { notes } from "@prisma/client"
import { prisma } from "../../../../db"
import { authOptions } from "../../../../lib/session"

export async function POST(request: NextRequest, res: NextResponse) {
  const session = await getServerSession(authOptions)
  if (!session) throw new Error("Unauthorized")

  const data: notes = await request.json()

  const result = await prisma.notes.delete({
    where: {
      id: data.id,
    },
  })

  return NextResponse.json({ result })
}
