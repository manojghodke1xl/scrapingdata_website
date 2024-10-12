import Pagination from "./Pagination";

const TableHeader = ({ headers }) => (
  <thead>
    <tr>
      {headers.map((header, index) => (
        <th key={index} className={header.className || ""}>
          {header.label}
        </th>
      ))}
      <th />
    </tr>
  </thead>
);

const TableRow = ({ rowData }) => (
  <tr>
    {rowData.map((data, index) => (
      <td key={index}>{data}</td>
    ))}
  </tr>
);

const Table = ({
  headers,
  rows,
  currentPage,
  totalPages,
  onPageChange,
  onSearch,
  entriesPerPage,
  onEntriesChange,
  totalCount,
  actions,
}) => {
  return (
    <div className="page-body">
      <div className="container-xl">
        <div className="col-12">
          <div className="card">
            <div className="card-body border-bottom py-3">
              <div className="d-flex">
                <div className="text-secondary">
                  Show
                  <div className="mx-2 d-inline-block">
                    <input
                      type="text"
                      className="form-control form-control-sm"
                      value={entriesPerPage}
                      aria-label="Entries count"
                      onChange={(e) => onEntriesChange(e.target.value)}
                    />
                  </div>
                  entries
                </div>
                <div className="ms-auto text-secondary">
                  Search:
                  <div className="ms-2 d-inline-block">
                    <input
                      type="text"
                      className="form-control form-control-sm"
                      aria-label="Search"
                      onChange={(e) => onSearch(e.target.value)}
                    />
                  </div>
                </div>
              </div>
            </div>
            <div className="table-responsive ">
              <table className="table card-table table-vcenter text-nowrap  datatable">
                <TableHeader headers={headers} />
                <tbody>
                  {rows.map((row, index) => (
                    <TableRow key={index} rowData={row} actions={actions} />
                  ))}
                </tbody>
              </table>
            </div>
            <div className="card-footer d-flex align-items-center">
              <p className="m-0 text-secondary">
                Showing {currentPage} of {totalPages} pages, total entries:{" "}
                {totalCount}
              </p>
              <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={onPageChange}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Table;
