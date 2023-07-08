import { getServerSession } from "next-auth"
import { NextRequest, NextResponse } from "next/server"
import { authOptions } from "../../../lib/session"
import { utapi } from "uploadthing/server"

export async function POST(request: NextRequest, res: NextResponse) {
  const session = await getServerSession(authOptions)
  if (!session) throw new Error("Unauthorized")

  const data = await request.json()

  await utapi.deleteFiles(data.fileKey)

  return NextResponse.json({ msg: "DONE" })
}
