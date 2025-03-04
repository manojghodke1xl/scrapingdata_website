import { useState } from 'react';
import { RxCaretSort } from 'react-icons/rx';
import TableRowActions from './TableRowActions';
import Checkbox from '../formFields/Checkbox';
import useColorContext from '../../hooks/useColorContext';
import { LuPin, LuPinOff } from 'react-icons/lu';

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
  editPath,
  viewPath,
  appsPath,
  copyPath,
  deleteAction,
  tableState,
  setModalState,
  managePackage,
  managePackagePath,
  sendForApproval,
  sendCertificate,
  sendCertificateUnique,
  approvalApi,
  handleDragStart,
  handleDragOver,
  handleDrop,
  handleDragEnd,
  sortConfig,
  onSort,
  currentPage,
  itemsPerPage,
  pinnedColumns,
  hiddenColumns,
  handleTogglePin
}) => {
  const { isDarkMode } = useColorContext();
  const [openDropdownId, setOpenDropdownId] = useState(null);

  const getSerialNumber = (index) => {
    const activePage = currentPage || tableState.currentPage;
    const activeItemsPerPage = itemsPerPage || tableState.itemsPerPage;
    return ((activePage - 1) * activeItemsPerPage + (index + 1)).toString().padStart(3, '0');
  };

  const isPinnedLeft = (colId) => pinnedColumns.left.includes(colId);
  const isPinnedRight = (colId) => hiddenColumns.includes(colId) || colId === 'status';
  const isHidden = (colId) => hiddenColumns.includes(colId);

  const defaultPinnedWidth = 80;

  const CHECKBOX_WIDTH = 36;
  const SERIAL_WIDTH = 40;
  const getInitialOffset = () => (selectable ? CHECKBOX_WIDTH + SERIAL_WIDTH : SERIAL_WIDTH);

  // Compute offsets for left pinned columns
  const leftPinnedOffsets = {};
  let currentLeftOffset = getInitialOffset(); // Start after fixed columns
  headers.forEach((col) => {
    if (isPinnedLeft(col.key)) {
      leftPinnedOffsets[col.key] = currentLeftOffset;
      currentLeftOffset += col.width || defaultPinnedWidth;
    }
  });

  // Compute offsets for right pinned columns (iterate in reverse order)
  const rightPinnedOffsets = {};
  let currentRightOffset = actions ? 68 : 0; // Start with action column width if it exists
  [...headers].reverse().forEach((col) => {
    if (col.key === 'status' || isPinnedRight(col.key)) {
      rightPinnedOffsets[col.key] = currentRightOffset;
      currentRightOffset += col.width || defaultPinnedWidth;
    }
  });

  const groupHeaders = (headers) => {
    return headers.reduce(
      (acc, header) => {
        if (isPinnedLeft(header.key)) acc.leftPinned.push(header);
        else if (header.key === 'status' || isPinnedRight(header.key)) acc.rightPinned.push(header);
        else acc.unpinned.push(header);
        return acc;
      },
      { leftPinned: [], unpinned: [], rightPinned: [] }
    );
  };

  return (
    <div className=" overflow-x-auto">
      <table className="min-w-full divide-y divide-primary text-sm">
        <thead>
          <tr>
            {/* Checkbox column */}
            {selectable && (
              <th scope="col" className="px-2 py-2 text-left sticky left-0 bg-main z-30 w-[60px]">
                <Checkbox checked={selectionState.isAllSelected} onChange={handleMasterCheckboxChange} />
              </th>
            )}

            {/* Serial number column */}
            <th scope="col" style={{ left: selectable ? `${CHECKBOX_WIDTH}px` : 0 }} className="px-2 py-2 whitespace-nowrap text-left sticky bg-main z-30 w-[60px]">
              Sr. No.
            </th>

            {/* Group and render headers in correct order */}
            {(() => {
              const { leftPinned, unpinned, rightPinned } = groupHeaders(headers);

              return [...leftPinned, ...unpinned, ...rightPinned].map((header) => {
                if (isHidden(header.key)) return null;

                let pinnedStyle = {};

                if (isPinnedLeft(header.key)) pinnedStyle = { left: `${leftPinnedOffsets[header.key]}px` };
                else if (header.key === 'status' || isPinnedRight(header.key)) pinnedStyle = { right: `${rightPinnedOffsets[header.key]}px` };

                const stickyClass = isPinnedLeft(header.key) || isPinnedRight(header.key) ? `sticky bg-main` : '';

                return (
                  <th
                    scope="col"
                    key={header.key}
                    draggable={!isPinnedLeft(header.key) && !isPinnedRight(header.key)}
                    onDragStart={(e) => handleDragStart(e, header.key)}
                    onDragOver={handleDragOver}
                    onDrop={(e) => handleDrop(e, header.key)}
                    onDragEnd={handleDragEnd}
                    style={pinnedStyle}
                    className={`px-2 text-left font-semibold text-primary ${stickyClass}`}
                  >
                    <div className="flex items-center gap-1">
                      <span className="whitespace-nowrap">{header.label}</span>
                      {header.sortable !== false && (
                        <RxCaretSort
                          size={20}
                          strokeWidth="0.5"
                          fill="none"
                          onClick={() => onSort(header.key)}
                          className={`cursor-pointer ${sortConfig.key === header.key ? 'text-brand' : ''}`}
                        />
                      )}
                      {!['status'].includes(header.key) && (
                        <button
                          className="text-xs text-secondary focus:outline-none"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleTogglePin(header.key);
                          }}
                        >
                          {isPinnedLeft(header.key) || isPinnedRight(header.key) ? <LuPinOff size={15} className="text-primary" /> : <LuPin size={15} className="text-primary " />}
                        </button>
                      )}
                    </div>
                  </th>
                );
              });
            })()}

            {actions && (
              <th scope="col" style={{ right: 0 }} className="px-2 text-left font-semibold text-primary sticky bg-main z-30">
                Actions
              </th>
            )}
          </tr>
        </thead>
        <tbody>
          {isLoading ? (
            <tr>
              <td colSpan={headers.length + (selectable ? 1 : 0) + (actions ? 1 : 0)}>
                <div role="status" className="w-full border border-primary divide-y divide-primary rounded shadow animate-pulse ">
                  {[...Array(10)].map((_, idx) => (
                    <div key={idx} className="flex items-center justify-between w-full px-4 py-1">
                      <div className="flex-1 flex-col items-center justify-center py-2 space-y-2">
                        <div className={`h-0.5 md:h-2.5 ${isDarkMode ? 'bg-gray-700' : 'bg-gray-300'} rounded-full w-1/4  `} />
                        <div className={`h-0.5 md:h-2 ${isDarkMode ? 'bg-gray-600' : 'bg-gray-200'} rounded-full w-2/3  `} />
                      </div>
                      <div className={`h-0.5 md:h-2.5 ${isDarkMode ? 'bg-gray-700' : 'bg-gray-300'} rounded-full self-center  w-1/6 `} />
                    </div>
                  ))}
                </div>
              </td>
            </tr>
          ) : rows.length > 0 ? (
            rows?.map((row, index) => {
              return (
                <tr key={row.id} className={`border-b border-primary ${selectionState.selectedItems.includes(row.id) ? 'bg-primary-faded' : 'hover:bg-hover'}`}>
                  {selectable && (
                    <td className="px-2 py-1 sticky left-0 bg-main z-30 w-[60px]">
                      <Checkbox checked={selectionState.selectedItems.includes(row.id)} onChange={() => handleRowCheckboxChange(row.id)} disabled={row.isSuperAdmin} />
                    </td>
                  )}
                  <td style={{ left: selectable ? `${CHECKBOX_WIDTH}px` : 0 }} className="px-2 py-1 sticky bg-main z-30 w-[60px]">
                    {getSerialNumber(index)}
                  </td>

                  {(() => {
                    const { leftPinned, unpinned, rightPinned } = groupHeaders(headers);

                    return [...leftPinned, ...unpinned, ...rightPinned].map((header) => {
                      if (isHidden(header.key)) return null;

                      let pinnedStyle = {};

                      if (isPinnedLeft(header.key)) pinnedStyle = { left: `${leftPinnedOffsets[header.key]}px` };
                      else if (header.key === 'status' || isPinnedRight(header.key)) pinnedStyle = { right: `${rightPinnedOffsets[header.key]}px` };

                      const stickyClass = isPinnedLeft(header.key) || isPinnedRight(header.key) ? `sticky bg-main` : '';

                      return (
                        <td key={header.key} style={pinnedStyle} className={`whitespace-nowrap px-2 py-1 ${stickyClass}`}>
                          {row[header.key]}
                        </td>
                      );
                    });
                  })()}

                  {actions && (
                    <td className={`bg-main ${openDropdownId === row.id ? 'fixed right-20 pr-9 z-10' : 'sticky right-0'} `}>
                      <TableRowActions
                        row={row}
                        editPath={editPath}
                        viewPath={viewPath}
                        appsPath={appsPath}
                        copyPath={copyPath}
                        deleteAction={deleteAction}
                        setSelectionState={setSelectionState}
                        setModalState={setModalState}
                        managePackage={managePackage}
                        managePackagePath={managePackagePath}
                        sendForApproval={sendForApproval}
                        sendCertificate={sendCertificate}
                        sendCertificateUnique={sendCertificateUnique}
                        approvalApi={approvalApi}
                        isOpen={openDropdownId === row.id}
                        openDropdownId={openDropdownId}
                        onToggle={(id) => setOpenDropdownId(openDropdownId === id ? null : id)}
                      />
                    </td>
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
    </div>
  );
};

export default TableView;
