import { useState } from 'react';
import { FaAngleLeft, FaAngleRight } from 'react-icons/fa';

const Pagination = ({ currentPage, totalPages, totalRecords, itemsPerPage, setItemsPerPage, handlePageChange }) => {
  const [page, setPage] = useState(currentPage);
  const [items, setItems] = useState(itemsPerPage);

  const renderPaginationLinks = () => {
    const paginationArray = [];

    // Always show the first page
    paginationArray.push(
      <span
        key={1}
        className={`rounded-xl mx-1 items-center justify-center h-fit py-1.5 px-3.5 font-medium ${
          1 === currentPage ? 'z-10 bg-[#EFF8FF] text-blue' : 'text-primary ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0 cursor-pointer'
        }`}
        onClick={() => handlePageChange(1)}
      >
        1
      </span>
    );

    // Add ellipsis if needed
    if (currentPage > 2) {
      paginationArray.push(
        <span key="ellipsis1" className="px-3">
          ...
        </span>
      );
    }

    // Add pages around the current page
    for (let i = Math.max(2, currentPage - 1); i <= Math.min(totalPages - 1, currentPage + 1); i++) {
      paginationArray.push(
        <span
          key={i}
          className={`rounded-xl mx-1 items-center justify-center h-fit py-1.5 px-3.5 font-medium ${
            i === currentPage ? 'z-10 bg-[#EFF8FF] text-blue' : 'text-primary ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0 cursor-pointer'
          }`}
          onClick={() => handlePageChange(i)}
        >
          {i}
        </span>
      );
    }

    // Add ellipsis if needed
    if (currentPage < totalPages - 1) {
      paginationArray.push(
        <span key="ellipsis2" className="px-3">
          ...
        </span>
      );
    }

    // Always show the last page
    if (totalPages > 1) {
      paginationArray.push(
        <span
          key={totalPages}
          className={`rounded-xl mx-1 items-center justify-center h-fit py-1.5 px-3.5 font-medium ${
            totalPages === currentPage
              ? 'z-10 bg-[#EFF8FF] text-blue'
              : 'text-primary ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0 cursor-pointer'
          }`}
          onClick={() => handlePageChange(totalPages)}
        >
          {totalPages}
        </span>
      );
    }

    return paginationArray;
  };

  return (
    <div className="flex items-center justify-between bg-white px-2 sm:px-6 gap-4">
      <div className="w-full flex flex-col sm:flex-row gap-y-5 justify-center xl:justify-between flex-wrap xl:flex-nowrap py-2 items-center">
        <div className="flex gap-3 items-start">
          <div className="dropdown-container w-full sm:min-w-[200px] sm:max-w-[260px] flex gap-3 items-center order-1 lg:order-1 xl:order-1">
            <span className="text-secondary whitespace-nowrap">Records Per Page:</span>
            <input
              type="number"
              min="1"
              onWheel={(e) => e.target.blur()}
              onKeyDown={(e) => e.key === 'Enter' && setItemsPerPage({ ...itemsPerPage, itemsPerPage: parseInt(e.target.value, 10) || 1, currentPage: 1 })}
              onBlur={(e) => setItemsPerPage((prev) => ({ ...prev, itemsPerPage: parseInt(e.target.value, 10) || 1, currentPage: 1 }))}
              onChange={(e) => setItems(e.target.value)}
              value={items}
              className={`h-8 min-w-[2.5rem] px-2 text-sm rounded-xl border text-center font-normal focus:outline-none focus:ring-0 focus:border-blue placeholder:text-gray-400 text-dark bg-transparent transition-all`}
              style={{ width: `${Math.max(2.5, items.toString().length * 0.7)}rem` }}
            />
          </div>
        </div>

        <div className="flex flex-col items-start justify-between gap-2 order-2">
          <div className="flex flex-col gap-3 items-center justify-center">
            <div className="flex gap-3 items-center justify-center">
              <span
                className={`inline-flex items-center rounded-xl border border-gray-300 h-fit bg-white px-2 py-2 text-sm font-medium text-primary hover:bg-gray-50 ${
                  currentPage === 1 ? 'cursor-not-allowed' : 'cursor-pointer'
                }`}
                onClick={() => currentPage > 1 && handlePageChange(currentPage - 1)}
              >
                <FaAngleLeft size={20} />
              </span>

              <nav className="isolate inline-flex rounded-md justify-center" aria-label="Pagination">
                {renderPaginationLinks()}
              </nav>

              <span
                className={`inline-flex items-center rounded-xl border border-gray-300 h-fit bg-white px-2 py-2 text-sm font-medium text-primary hover:bg-gray-50 ${
                  currentPage === totalPages ? 'cursor-not-allowed' : 'cursor-pointer'
                }`}
                onClick={() => currentPage < totalPages && handlePageChange(currentPage + 1)}
              >
                <FaAngleRight size={20} />
              </span>
            </div>
            <div className="flex items-center justify-center">
              <span className="flex items-center text-sm font-medium text-primary">Total Records: {totalRecords}</span>
            </div>
          </div>
        </div>

        <div className="flex gap-3 items-center order-3">
          <span className="flex items-center text-[15px] font-medium px-4 py-2 rounded-xl bg-gray-50 text-primary">
            Page &nbsp;
            <input
              type="number"
              min="1"
              max={totalPages}
              onWheel={(e) => e.target.blur()}
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  const newPage = Math.min(Math.max(1, parseInt(e.target.value, 10)), totalPages);
                  setItemsPerPage((prev) => ({ ...prev, currentPage: newPage }));
                  handlePageChange(newPage);
                  setPage(newPage);
                }
              }}
              onBlur={(e) => {
                const newPage = Math.min(Math.max(1, parseInt(e.target.value, 10)), totalPages);
                setItemsPerPage((prev) => ({ ...prev, currentPage: newPage }));
                handlePageChange(newPage);
                setPage(newPage);
              }}
              onChange={(e) => setPage(e.target.value)}
              value={page}
              className={`h-8 min-w-[2.5rem] px-2 text-sm rounded-xl border text-center font-normal focus:outline-none focus:ring-0 focus:border-blue placeholder:text-gray-400 text-dark bg-transparent transition-all`}
              style={{ width: `${Math.max(2.5, page.toString().length * 0.7)}rem` }}
            />
            &nbsp;of {totalPages}
          </span>
        </div>
      </div>
    </div>
  );
};

export default Pagination;
