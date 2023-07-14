const Pagination = ({
    notesPerPage,
    totalPosts,
    paginate,
}: {
    notesPerPage: number
    totalPosts: number,
    paginate: (pageNumber: number) => void
}) => {
    const pageNumbers = []
    for (let i = 1; i <= Math.ceil(totalPosts / notesPerPage); i++) {
        pageNumbers.push(i)
    }
    return (
        <nav className="flex bg-slate-300 h-fit px-4 items-center">
            <ul className="flex justify-between w-[150px] items-center">
                {pageNumbers.map((number) => (
                    <li key={number} className="">
                        <a onClick={() => paginate(number)} className="cursor-pointer border-slate-400 "> { /* href attribute*/}
                            {number}
                        </a>
                    </li>
                ))}
            </ul>
        </nav>
    )
}

export default Pagination
