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
  entriesPerPage,
  setSearchTerm,
  setSearchKey,
  allsites = [],
  setSiteId,
  searchAbleKeys,
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
              <div className="d-flex justify-content-between">
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
                {allsites.length > 0 && (
                  <div className="text-secondary">
                    Site
                    <div className="mx-2 d-inline-block">
                      <select className="form-select form-control-sm" onChange={(e) => setSiteId(e.target.value)}>
                        <option value={""}>All</option>
                        {allsites.map((site) => (
                          <option key={site._id} value={site._id}>
                            {site.name}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                )}
                <div className="text-secondary">
                  Search:
                  <div className="ms-2 d-inline-block">
                    <select className="form-select form-control-sm" onChange={(e) => setSearchKey(e.target.value)}>
                      <option value={""}>Select</option>
                      {searchAbleKeys.map((key, i) => (
                        <option key={i} value={key}>
                          {key}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className="ms-2 d-inline-block input-icon">
                    <span className="input-icon-addon">
                      <svg
                        width={24}
                        height={24}
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth={2}
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="icon"
                      >
                        <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                        <path d="M10 10m-7 0a7 7 0 1 0 14 0a7 7 0 1 0 -14 0" />
                        <path d="M21 21l-6 -6" />
                      </svg>
                    </span>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Search…"
                      aria-label="Search"
                      onChange={(e) => setSearchTerm(e.target.value)}
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
                Showing {currentPage} of {totalPages} pages, total entries: {totalCount}
              </p>
              <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={onPageChange} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Table;
