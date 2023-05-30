import SearchBar from "@/components/SearchBar"
import { prisma } from "../../db"
import BlogCard from "@/components/BlogCard"
import NoteCard from "@/components/NoteCard"

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