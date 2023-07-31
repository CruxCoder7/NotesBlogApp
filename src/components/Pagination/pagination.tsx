const Pagination = ({
  notesPerPage,
  totalPosts,
  paginate,
}: {
  notesPerPage: number
  totalPosts: number
  paginate: (pageNumber: number) => void
}) => {
  const pageNumbers = []
  for (let i = 1; i <= Math.ceil(totalPosts / notesPerPage); i++) {
    pageNumbers.push(i)
  }
  return (
    <div className="flex bg-slate-300 h-[30px] px-4 items-center">
      <ul className="flex justify-between w-[150px] items-center">
        {pageNumbers.map((number, index) => (
          <li
            key={number}
            className={` ${
              index !== pageNumbers.length - 1
                ? "border-r pr-2 cursor-pointer"
                : "cursor-pointer"
            }`}
            onClick={() => paginate(number)}
          >
            <a
              onClick={() => paginate(number)}
              className="cursor-pointer border-transparent hover:border-slate-400 hover:opacity-75 px-1 py-1"
            >
              {number}
            </a>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default Pagination
