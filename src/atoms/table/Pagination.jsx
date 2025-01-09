import { useEffect, useRef, useState } from 'react';
import { FaAngleDown, FaAngleLeft, FaAngleRight } from 'react-icons/fa';

const Pagination = ({ currentPage, totalPages, totalRecords, itemsPerPage, setItemsPerPage, handlePageChange }) => {
  const renderPaginationLinks = () => {
    const paginationArray = [];

    // Always show the first page
    paginationArray.push(
      <span
        key={1}
        className={`relative rounded-xl mx-1 items-center justify-center h-fit py-1.5 px-3.5 font-medium ${
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
          className={`relative rounded-xl mx-1 items-center justify-center h-fit py-1.5 px-3.5 font-medium ${
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
          className={`relative rounded-xl mx-1 items-center justify-center h-fit py-1.5 px-3.5 font-medium ${
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

  const menuRef2 = useRef(null);
  const [isOpen2, setIsOpen2] = useState(false);
  const closeMenu2 = (e) => {
    if (menuRef2.current && !menuRef2.current.contains(e.target)) {
      setIsOpen2(false);
    }
  };

  useEffect(() => {
    document.addEventListener('click', closeMenu2);
    return () => document.removeEventListener('click', closeMenu2);
  }, []);

  const handleSelectItems = (items) => {
    setItemsPerPage((prev) => ({ ...prev, itemsPerPage: items, currentPage: 1 }));
    setIsOpen2(false);
  };

  return (
    <div className="flex items-center justify-between bg-white px-2 sm:px-6">
      <div className="w-full flex gap-y-5 justify-center xl:justify-between flex-wrap xl:flex-nowrap py-2 items-center">
        <div className="flex gap-3 items-center">
          <div className="dropdown-container relative w-full sm:min-w-[200px] sm:max-w-[260px] flex gap-3 items-center order-1 lg:order-1 xl:order-1" ref={menuRef2}>
            <span className="text-secondary whitespace-nowrap">Records Per Page:</span>
            <details
              className="relative w-full cursor-default rounded-lg bg-white pl-3 pr-10 text-left text-primary border border-primary shadow-sm focus:outline-none focus:border focus:border-fadedblue sm:text-lg sm:leading-6"
              open={isOpen2}
              onToggle={(e) => setIsOpen2(e.target.open)}
            >
              <summary className="cursor-pointer py-2.5 pl-2  text-left text-primary list-none">
                <span className="flex items-center">
                  <span className="block whitespace-nowrap text-base capitalize">{itemsPerPage || 'Select Items Per Page'}</span>
                </span>
                <span className="absolute inset-y-0 right-0 ml-3 flex items-center pr-2">
                  <FaAngleDown />
                </span>
              </summary>
              <ul className="absolute bottom-full top-auto z-40 mt-1 max-h-48 overflow-y-auto custom-scrollbar w-full rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                {[1, 2, 5, 10, 30, 50, 100].map((items) => (
                  <li
                    key={items}
                    className={`group relative capitalize cursor-default select-none py-2 pl-3 pr-9 text-primary hover:bg-fadedblue hover:text-gray-700 ${
                      itemsPerPage === items ? 'bg-fadedblue text-primary' : ''
                    }`}
                    onClick={() => handleSelectItems(items)}
                  >
                    <div className="flex items-center">
                      <span className={`ml-3 block whitespace-nowrap font-normal ${itemsPerPage === items ? 'font-semibold' : ''}`}>{items}</span>
                    </div>
                  </li>
                ))}
              </ul>
            </details>
          </div>
        </div>

        <div className="flex responsive-paginationnn items-center justify-around gap-1 sm:gap-2 order-2 lg:order-3 xl:order-2">
          <div className="w-fit flex justify-start responsive-paginationnn1">
            <span
              className={`relative inline-flex items-center rounded-xl border border-gray-300 h-fit bg-white px-2 py-2 text-sm font-medium text-primary hover:bg-gray-50 ${
                currentPage === 1 ? 'cursor-not-allowed' : 'cursor-pointer'
              }`}
              onClick={() => currentPage > 1 && handlePageChange(currentPage - 1)}
            >
              <FaAngleLeft size={20} />
            </span>
          </div>
          <nav className="isolate inline-flex rounded-md justify-center responsive-paginationnn2" aria-label="Pagination">
            {renderPaginationLinks()}
          </nav>
          <div className="w-fit flex justify-end responsive-paginationnn3">
            <span
              className={`relative inline-flex items-center rounded-xl border border-gray-300 h-fit bg-white px-2 py-2 text-sm font-medium text-primary hover:bg-gray-50 ${
                currentPage === totalPages ? 'cursor-not-allowed' : 'cursor-pointer'
              }`}
              onClick={() => currentPage < totalPages && handlePageChange(currentPage + 1)}
            >
              <FaAngleRight size={20} />
            </span>
          </div>
        </div>

        <div className="flex gap-3 items-center order-3 lg:order-2 xl:order-3">
          <span className="flex items-center text-[15px] font-medium px-4 py-2 rounded-xl bg-gray-50 text-primary">Total Records: {totalRecords}</span>
        </div>
      </div>
    </div>
  );
};

export default Pagination;
