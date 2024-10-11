const Pagination = ({ currentPage, totalPages, onPageChange }) => (
  <ul className="pagination m-0 ms-auto">
    <li className={`page-item ${currentPage === 1 ? "disabled" : ""}`}>
      <a
        className="page-link"
        href="#"
        tabIndex={1}
        onClick={(e) => {
          e.preventDefault();
          if (currentPage > 1) {
            onPageChange(currentPage - 1);
          }
        }}
      >
        prev
      </a>
    </li>
    <li className={`page-item ${currentPage === totalPages ? "disabled" : ""}`}>
      <a
        className="page-link"
        href="#"  
        onClick={(e) => {
          e.preventDefault();
          if (currentPage < totalPages) {
            onPageChange(currentPage + 1);
          }
        }}
      >
        next
      </a>
    </li>
  </ul>
);

export default Pagination;
