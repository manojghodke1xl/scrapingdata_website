import { MdEdit, MdOutlineApps, MdRemoveRedEye } from 'react-icons/md';
import { RxCaretSort } from 'react-icons/rx';
import { useNavigate } from 'react-router-dom';

const TableView = ({
  selectable,
  selectionState,
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
  appsPath
}) => {
  const navigate = useNavigate();
  return (
    <table className="min-w-full divide-y divide-gray-200">
      <thead>
        <tr>
          {selectable && (
            <th scope="col" className="px-4 py-2.5 text-left">
              <label className="inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={selectionState.isAllSelected}
                  onChange={handleMasterCheckboxChange}
                  className="form-checkbox h-4 w-4 text-blue-600 focus:outline-none"
                />
              </label>
            </th>
          )}
          {headers?.map((header, index) => (
            <th key={index} scope="col" className="px-6 py-2.5 text-left font-semibold text-primary">
              <div className="flex items-center gap-2">
                <span className="whitespace-nowrap">{header.label}</span>
                {header.sortable !== false && <RxCaretSort size={20} strokeWidth="0.5" fill="none" />}
              </div>
            </th>
          ))}
          {actions && (
            <th scope="col" className="px-6 py-2 text-left font-semibold text-primary">
              Actions
            </th>
          )}
        </tr>
      </thead>
      <tbody>
        {isLoading ? (
          <tr>
            <td colSpan={headers.length + (selectable ? 1 : 0) + (actions ? 1 : 0)}>
              <div
                role="status"
                className="w-full p-4 space-y-4 border border-gray-200 divide-y divide-gray-200 rounded shadow animate-pulse dark:divide-gray-200 md:p-6 dark:border-gray-200"
              >
                {/* Header Skeleton */}
                <div className="flex items-center justify-between mb-4">
                  <div className="h-2.5 bg-gray-300 rounded-full dark:bg-gray-300 w-24 mb-2.5"></div>
                  <div className="h-2.5 bg-gray-300 rounded-full dark:bg-gray-200 w-12"></div>
                </div>

                {/* Row Skeleton */}
                {[...Array(5)].map((_, idx) => (
                  <div key={idx} className="flex items-center justify-between pt-4">
                    <div>
                      <div className="h-2.5 bg-gray-300 rounded-full dark:bg-gray-300 w-24 mb-2.5"></div>
                      <div className="w-32 h-2 bg-gray-200 rounded-full dark:bg-gray-200"></div>
                    </div>
                    <div className="h-2.5 bg-gray-300 rounded-full dark:bg-gray-200 w-12"></div>
                  </div>
                ))}
              </div>
            </td>
          </tr>
        ) : (
          rows?.map((row, index) => (
            <tr key={row.id} className={`border-b border-primary ${selectionState.selectedItems.includes(row.id) ? 'bg-blue-50' : 'hover:bg-gray-50'}`}>
              {selectable && (
                <td className="px-4 py-2">
                  {!row.isSuperAdmin && (
                    <label className="inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        checked={selectionState.selectedItems.includes(row.id)}
                        onChange={() => handleRowCheckboxChange(row.id)}
                        className="form-checkbox h-4 w-4 text-blue-600"
                      />
                    </label>
                  )}
                </td>
              )}
              {headers.map((header, headerIndex) => (
                <td key={`${row.id}-${headerIndex}`} className="px-6 py-2 text-secondary whitespace-nowrap font-medium">
                  {header.key === 'srno'
                    ? (index + 1).toString().padStart(3, '0') // Handle Sr No.
                    : row[header.key]}
                </td>
              ))}
              {actions && (
                <td className="w-full flex gap-2 items-center px-6 py-2 whitespace-nowrap font-medium text-secondary hover:text-gray-900">
                  {edit && !row.isSuperAdmin && <MdEdit className="text-2xl" onClick={() => navigate(editPath + '/' + row.id)} />}
                  {view && !row.isSuperAdmin && <MdRemoveRedEye className="text-2xl" onClick={() => navigate(viewPath + '/' + row.id)} />}
                  {apps && !row.isSuperAdmin && <MdOutlineApps className="text-2xl" onClick={() => navigate(appsPath + '/' + row.id)} />}
                </td>
              )}
            </tr>
          ))
        )}
      </tbody>
    </table>
  );
};

export default TableView;
