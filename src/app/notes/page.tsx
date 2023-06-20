import SearchBar from "@/components/Notes/SearchBar"
import { prisma } from "../../db"
import NoteCard from "@/components/Notes/NoteCard"

export default async function Page() {

    const notes = await prisma.notes.findMany()

    return (
        <>
            <SearchBar />
            <div className="flex flex-wrap mt-32 gap-32 justify-center mb-3">
                {notes.map(note => <NoteCard key={note.id} content={note.topic} title={note.subject} id={note.id} />)}
            </div>
        </>
    )
}