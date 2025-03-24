import { useState, useEffect } from 'react';
import { FaAngleLeft, FaAngleRight } from 'react-icons/fa';

/**
 * Pagination component to handle page navigation and items per page selection.
 *
 * @param {number} currentPage - The current page number.
 * @param {number} totalPages - The total number of pages.
 * @param {number} totalRecords - The total number of records.
 * @param {number} itemsPerPage - The number of items per page.
 * @param {Function} setItemsPerPage - Function to set items per page.
 * @param {Function} handlePageChange - Function to handle page change.
 */
const Pagination = ({ currentPage, totalPages, totalRecords, itemsPerPage, setItemsPerPage, handlePageChange }) => {
  const [page, setPage] = useState(currentPage);
  const [items, setItems] = useState(itemsPerPage);

  // Update local state when currentPage prop changes
  useEffect(() => {
    setPage(currentPage);
  }, [currentPage]);

  // Update local state when itemsPerPage prop changes
  useEffect(() => {
    setItems(itemsPerPage);
  }, [itemsPerPage]);

  /**
   * Handle items per page change.
   * Updates state and calls setItemsPerPage function.
   */
  const handleItemsPerPageChange = (value) => {
    const newValue = parseInt(value, 10) || 1;
    setItems(newValue);

    if (typeof setItemsPerPage === 'function') {
      setItemsPerPage(newValue);
    } else if (setItemsPerPage && typeof setItemsPerPage === 'object') {
      setItemsPerPage({ itemsPerPage: newValue, currentPage: 1 });
    }
  };

  /**
   * Handle page input change.
   * Updates state and calls handlePageChange function.
   */
  const handlePageInputChange = (value) => {
    const newPage = Math.min(Math.max(1, parseInt(value, 10) || 1), totalPages);
    setPage(newPage);

    if (typeof setItemsPerPage === 'function') handlePageChange(newPage);
    else {
      setItemsPerPage((prev) => ({ ...prev, currentPage: newPage }));
      handlePageChange(newPage);
    }
  };

  /**
   * Render pagination links with ellipsis if needed.
   */
  const renderPaginationLinks = () => {
    const paginationArray = [];

    // Always show the first page
    paginationArray.push(
      <span
        key={1}
        className={`rounded-xl mx-1 items-center justify-center h-fit py-1 px-2 tet-sm border border-primary font-medium ${
          1 === currentPage ? 'z-10 bg-primary-faded text-brand' : 'text-primary hover:bg-hover focus:z-20 focus:outline-offset-0 cursor-pointer'
        }`}
        onClick={() => handlePageChange(1)}
      >
        1
      </span>
    );

    // Add ellipsis if needed
    if (currentPage > 2) {
      paginationArray.push(
        <span key="ellipsis1" className="px-1">
          ...
        </span>
      );
    }

    // Add pages around the current page
    for (let i = Math.max(2, currentPage - 1); i <= Math.min(totalPages - 1, currentPage + 1); i++) {
      paginationArray.push(
        <span
          key={i}
          className={`rounded-xl mx-1 items-center justify-center h-fit py-1 px-2 border border-primary font-medium ${
            i === currentPage ? 'z-10 bg-primary-faded text-brand' : 'text-primary hover:bg-hover focus:z-20 focus:outline-offset-0 cursor-pointer'
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
        <span key="ellipsis2" className="px-1">
          ...
        </span>
      );
    }

    // Always show the last page
    if (totalPages > 1) {
      paginationArray.push(
        <span
          key={totalPages}
          className={`rounded-xl items-center justify-center h-fit py-1 px-2 border border-primary font-medium ${
            totalPages === currentPage ? 'z-10 bg-primary-faded text-brand' : 'text-primary hover:bg-hover focus:z-20 focus:outline-offset-0 cursor-pointer'
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
    <div className="flex items-center justify-between bg-inherit px-2 gap-1 border-t border-primary">
      <div className="w-full flex flex-col sm:flex-row gap-y-1 justify-center xl:justify-between flex-wrap xl:flex-nowrap py-1 items-center ">
        {/* Records per page input */}
        <div className="flex gap-2 items-start">
          <div className="w-full sm:min-w-[200px] sm:max-w-[260px] flex gap-2 items-center order-1">
            <span className="text-secondary whitespace-nowrap text-sm">Records Per Page:</span>
            <input
              type="number"
              min="1"
              onWheel={(e) => e.target.blur()}
              onKeyDown={(e) => e.key === 'Enter' && handleItemsPerPageChange(e.target.value)}
              onBlur={(e) => handleItemsPerPageChange(e.target.value)}
              onChange={(e) => setItems(e.target.value)}
              value={items}
              className={`h-8 min-w-[2rem] px-1 text-sm rounded-xl border border-primary text-center font-normal focus:outline-none focus:ring-0 focus:border-secondary placeholder:text-placeholder text-dark bg-transparent transition-all`}
              style={{ width: `${Math.max(3, items.toString().length * 1)}rem` }}
            />
          </div>
        </div>

        {/* Pagination controls */}
        <div className="flex flex-col items-start justify-between gap-2 order-2">
          <div className="flex flex-col gap-1 items-center justify-center">
            <div className="flex gap-1 items-center justify-center">
              <span
                className={`inline-flex items-center rounded-xl border border-primary h-fit bg-inherit px-1 py-1 text-sm font-medium text-primary hover:bg-hover ${
                  currentPage === 1 ? 'cursor-not-allowed opacity-50' : 'cursor-pointer'
                }`}
                onClick={() => currentPage > 1 && handlePageChange(currentPage - 1)}
              >
                <FaAngleLeft className="text-xl" />
              </span>

              <nav className="isolate inline-flex rounded-md justify-center" aria-label="Pagination">
                {renderPaginationLinks()}
              </nav>

              <span
                className={`inline-flex items-center rounded-xl border border-primary h-fit bg-inherit px-1 py-1 text-sm font-medium text-primary hover:bg-hover ${
                  currentPage === totalPages ? 'cursor-not-allowed opacity-50' : 'cursor-pointer'
                }`}
                onClick={() => currentPage < totalPages && handlePageChange(currentPage + 1)}
              >
                <FaAngleRight className="text-xl" />
              </span>
            </div>
            <div className="flex items-center justify-center">
              <span className="flex items-center text-sm font-medium text-primary">Total Records: {totalRecords}</span>
            </div>
          </div>
        </div>

        {/* Page input */}
        <div className="flex gap-2 items-center order-3">
          <span className="flex items-center text-sm font-medium rounded-xl text-primary">
            Page &nbsp;
            <input
              type="number"
              min="1"
              max={totalPages}
              onWheel={(e) => e.target.blur()}
              onKeyDown={(e) => e.key === 'Enter' && handlePageInputChange(e.target.value)}
              onBlur={(e) => handlePageInputChange(e.target.value)}
              onChange={(e) => setPage(e.target.value)}
              value={page}
              className={`h-8 min-w-[2rem] px-1 text-sm rounded-xl border border-primary text-center font-normal focus:outline-none focus:ring-0 focus:border-secondary placeholder:text-placeholder text-dark bg-transparent transition-all`}
              style={{ width: `${Math.max(2.5, page.toString().length * 1)}rem` }}
            />
            &nbsp;of {totalPages}
          </span>
        </div>
      </div>
    </div>
  );
};

export default Pagination;
