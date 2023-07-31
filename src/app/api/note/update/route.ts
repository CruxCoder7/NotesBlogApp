import { getServerSession } from "next-auth"
import { NextRequest, NextResponse } from "next/server"
import { notes } from "@prisma/client"
import { prisma } from "../../../../db"
import { authOptions } from "../../../../lib/session"

export async function POST(request: NextRequest, res: NextResponse) {
  const session = await getServerSession(authOptions)
  if (!session) throw new Error("Unauthorized")

  const data: notes = await request.json()

  const input = Object.fromEntries(
    Object.entries(data).filter(([key]) => key !== "id")
  )

  const result = await prisma.notes.update({
    where: {
      id: data.id,
    },
    data: input,
  })

  return NextResponse.json({ result })
}
