import React from "react"
import { prisma } from "../../../../db"
import NoteHandler from "@/components/Notes/NoteHandler"

export default async function Page({ params }: { params: { id: string } }) {
  const note = await prisma.notes.findFirst({ where: { id: params.id } })
  return (
    <>
      <title>Update Note</title>
      <NoteHandler note={note} />
    </>
  )
}
