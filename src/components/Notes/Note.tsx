"use client"

import { notes } from "@prisma/client"
import NoteCard from "./NoteCard"
import SearchBar from "./SearchBar"
import { useState } from "react"
import Pagination from "../Pagination/pagination"

const Note = ({ notes }: { notes: notes[] }) => {
    const [search, setSearch] = useState("")
    const [currentPage, setCurrentPage] = useState(1)
    const [notesPerPage] = useState(9)

    const indexOfLastNote = currentPage * notesPerPage
    const indexOfFirstNote = indexOfLastNote - notesPerPage
    const currentNotes = notes?.slice(indexOfFirstNote, indexOfLastNote)
    const paginate = (pageNumber: number) => setCurrentPage(pageNumber)

    return (
        <>
            <SearchBar setSearch={setSearch} />
            <div className="flex flex-wrap mt-24 lg:md:mt-32 gap-32 justify-center items-center mb-5 w-full">
                {search === "" ? notes && currentNotes.filter((val) => {
                    if (
                        val.subject.toLowerCase().includes(search.toLocaleLowerCase())
                    ) {
                        return val;
                    } else return 0;
                }).map((note, i) => {
                    return (
                        <NoteCard
                            key={i}
                            topic={note.topic}
                            subject={note.subject}
                            url={note.url}
                        />
                    )
                }) : notes && notes.filter((val) => {
                    if (
                        val.subject.toLowerCase().includes(search.toLocaleLowerCase())
                    ) {
                        return val;
                    } else return 0;
                }).map((note, i) => {
                    return (
                        <NoteCard
                            key={i}
                            topic={note.topic}
                            subject={note.subject}
                            url={note.url}
                        />
                    )
                })}
            </div>
            <div className="flex justify-center items-center mt-10">
                <Pagination
                    notesPerPage={notesPerPage}
                    paginate={paginate}
                    totalPosts={notes.length}
                />
            </div>
        </>
    )
}

export default Note
