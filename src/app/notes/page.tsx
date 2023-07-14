import { prisma } from "../../db";
import Note from "@/components/Notes/Note";

export const revalidate = 30 // revalidate every 30s

async function getNotes() {
  const notes = await prisma.notes.findMany();
  return notes;
}

export default async function Page() {
  const notes = await getNotes();
  return <Note notes={notes} />
}
