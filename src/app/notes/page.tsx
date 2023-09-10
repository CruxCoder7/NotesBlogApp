import { prisma } from "../../db"
import Note from "@/components/Notes/Note"
import { getCurrentUser } from "../../lib/session"
import { Metadata } from "next"

export const revalidate = 30 // revalidate every 30s

async function getNotes() {
  const notes = await prisma.notes.findMany()
  return notes
}

export const metadata: Metadata = {
  title: "Notes",
  description: "...",
}

export default async function Page() {
  const notes = await getNotes()
  const session = await getCurrentUser()
  return <Note notes={notes} session={session} />
}
