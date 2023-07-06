import SearchBar from "@/components/Notes/SearchBar";
import { prisma } from "../../db";
import NoteCard from "@/components/Notes/NoteCard";

async function getNotes() {
  const notes = await prisma.notes.findMany();
  return notes
}

export default async function Page() {
  const notes = await getNotes();
  return (
    <>
      <SearchBar />
      <div className="flex flex-wrap mt-24 lg:md:mt-32 gap-32 justify-center items-center mb-5 w-full">
        {notes.map((note) => (
          <NoteCard
            key={note.id}
            topic={note.topic}
            subject={note.subject}
            url={note.url}
          />
        ))}
      </div>
    </>
  );
}
