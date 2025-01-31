import { RxCaretSort } from 'react-icons/rx';
import TableRowActions from './TableRowActions';

const TableView = ({
  selectable,
  selectionState,
  setSelectionState,
  handleMasterCheckboxChange,
  handleRowCheckboxChange,
  headers,
  rows,
  actions,
  isLoading,
  edit,
  editPath,
  view,
  viewPath,
  apps,
  appsPath,
  copy,
  copyPath,
  deleteAction,
  tableState,
  setModalState,
  managePackage,
  managePackagePath
}) => {
  return (
    <>
      <table className="min-w-full divide-y divide-gray-200 text-sm">
        <thead>
          <tr>
            {selectable && (
              <th scope="col" className="px-4 py-2 text-left">
                <label className="inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={selectionState.isAllSelected}
                    onChange={handleMasterCheckboxChange}
                    className="form-checkbox h-4 w-4 text-blue-600 focus:outline-none cursor-pointer"
                  />
                </label>
              </th>
            )}
            {headers?.map((header, index) => (
              <th key={index} scope="col" className="px-2 text-left font-semibold text-primary">
                <div className="flex items-center gap-2">
                  <span className="whitespace-nowrap">{header.label}</span>
                  {header.sortable !== false && <RxCaretSort size={20} strokeWidth="0.5" fill="none" />}
                </div>
              </th>
            ))}
            {actions && (
              <th scope="col" className="px-2 text-left font-semibold text-primary">
                Actions
              </th>
            )}
          </tr>
        </thead>
        <tbody>
          {isLoading ? (
            <tr>
              <td colSpan={headers.length + (selectable ? 1 : 0) + (actions ? 1 : 0)}>
                <div role="status" className="w-full border border-gray-200 divide-y divide-gray-200 rounded shadow animate-pulse dark:divide-gray-200 dark:border-gray-200">
                  {[...Array(10)].map((_, idx) => (
                    <div key={idx} className="flex items-center justify-between w-full px-4 py-1">
                      <div className="flex-1 flex-col items-center justify-center py-2 space-y-2">
                        <div className="h-0.5 md:h-2.5 bg-gray-300 rounded-full w-1/4 dark:bg-gray-300" />
                        <div className="h-0.5 md:h-2 bg-gray-200 rounded-full w-2/3 dark:bg-gray-200" />
                      </div>
                      <div className="h-0.5 md:h-2.5 bg-gray-300 rounded-full self-center dark:bg-gray-200 w-1/6" />
                    </div>
                  ))}
                </div>
              </td>
            </tr>
          ) : rows.length > 0 ? (
            rows?.map((row, index) => {
              return (
                <tr key={row.id} className={`border-b border-primary ${selectionState.selectedItems.includes(row.id) ? 'bg-blue-50' : 'hover:bg-gray-50'}`}>
                  {selectable && (
                    <td className="px-4 py-2">
                      <label className="inline-flex items-center cursor-pointer">
                        <input
                          type="checkbox"
                          checked={selectionState.selectedItems.includes(row.id)}
                          onChange={() => handleRowCheckboxChange(row.id)}
                          className="form-checkbox h-4 w-4 text-blue-600 cursor-pointer focus:outline-none"
                          disabled={row.isSuperAdmin}
                        />
                      </label>
                    </td>
                  )}
                  {headers.map((header, headerIndex) => (
                    <td key={`${row.id}-${headerIndex}`} className="px-2 text-secondary whitespace-nowrap font-medium">
                      {header.key === 'srno' ? ((tableState.currentPage - 1) * tableState.itemsPerPage + (index + 1)).toString().padStart(3, '0') : row[header.key]}
                    </td>
                  ))}
                  {actions && (
                    <TableRowActions
                      row={row}
                      edit={edit}
                      editPath={editPath}
                      view={view}
                      viewPath={viewPath}
                      apps={apps}
                      appsPath={appsPath}
                      copy={copy}
                      copyPath={copyPath}
                      deleteAction={deleteAction}
                      setSelectionState={setSelectionState}
                      setModalState={setModalState}
                      managePackage={managePackage}
                      managePackagePath={managePackagePath}
                    />
                  )}
                </tr>
              );
            })
          ) : (
            !isLoading &&
            rows.length === 0 && (
              <tr>
                <td colSpan={headers.length + (selectable ? 1 : 0) + (actions ? 1 : 0)} className="text-center ">
                  <p className="text-secondary p-4 border-b border-primary">No Data Available</p>
                </td>
              </tr>
            )
          )}
        </tbody>
      </table>
    </>
  );
};

export default TableView;
