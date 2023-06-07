
/**
 * @author Successor Onyemaechi <successoronyemaechi@gmail.com>
 */


export default function Pagination({currentPage, setCurrentPage, totalPages}) {
    return (
        <>
            <div className="flex justify-center mt-6">
                <button
                    className="px-4 py-2 bg-indigo-900 text-white rounded-l"
                    disabled={currentPage === 1}
                    onClick={() => setCurrentPage((prev) => prev - 1)}
                >
                    Previous
                </button>
                <div className="px-4 py-2 bg-gray-200 text-gray-700">
                    Page {currentPage} of {totalPages}
                </div>
                <button
                    className="px-4 py-2 bg-indigo-900 text-white rounded-r"
                    disabled={currentPage === totalPages}
                    onClick={() => setCurrentPage((prev) => prev + 1)}
                >
                    Next
                </button>
            </div>
        </>
    )

}