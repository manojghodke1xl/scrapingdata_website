import { useState } from 'react';
import { RxCaretSort } from 'react-icons/rx';
import { MdOutlinePushPin, MdPushPin } from 'react-icons/md';
import TableRowActions from './TableRowActions';
import Checkbox from '../formFields/Checkbox';
import useColorContext from '../../hooks/useColorContext';

/**
 * TableView - Handles the presentation layer of the table
 *
 * Features:
 * - Renders table header and body
 * - Handles pinned columns positioning
 * - Manages loading states
 * - Renders row actions
 * - Handles column drag and drop visualization
 */
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

  /**
   * Calculates serial number for each row based on current page and items per page
   * @param {number} index - Row index
   * @returns {string} Formatted serial number
   */
  const getSerialNumber = (index) => {
    const activePage = currentPage || tableState.currentPage;
    const activeItemsPerPage = itemsPerPage || tableState.itemsPerPage;
    return ((activePage - 1) * activeItemsPerPage + (index + 1)).toString().padStart(3, '0');
  };

  /**
   * Utility functions to check column states
   */
  const isPinnedLeft = (colId) => pinnedColumns.left.includes(String(colId));
  const isPinnedRight = (colId) => pinnedColumns.right.includes(String(colId)) || colId === 'status';
  const isHidden = (colId) => hiddenColumns.includes(String(colId));

  const defaultPinnedWidth = 40;

  const CHECKBOX_WIDTH = 24;
  const SERIAL_WIDTH = 24;
  const getInitialOffset = () => (selectable ? CHECKBOX_WIDTH + SERIAL_WIDTH : SERIAL_WIDTH);

  /**
   * Computes offsets for pinned columns
   * Used for sticky positioning of pinned columns
   * @returns {Object} Left and right offset positions
   */
  const computePinnedOffsets = () => {
    const leftOffsets = {};
    const rightOffsets = {};
    let leftPosition = getInitialOffset();
    let rightPosition = actions ? 55 : 0;

    headers.forEach((header) => {
      if (isPinnedLeft(header.id)) {
        leftOffsets[header.key] = leftPosition;
        leftPosition += header.width || defaultPinnedWidth;
      }
    });

    [...headers].reverse().forEach((header) => {
      if (header.key === 'status' || isPinnedRight(header.id)) {
        rightOffsets[header.key] = rightPosition;
        rightPosition += header.width || defaultPinnedWidth;
      }
    });

    return { leftOffsets, rightOffsets };
  };

  const { leftOffsets, rightOffsets } = computePinnedOffsets();

  /**
   * Groups headers into pinned and unpinned sections
   * @param {Array} headers - Table headers
   * @returns {Object} Grouped headers
   */
  const groupHeaders = (headers) => {
    return headers.reduce(
      (acc, header) => {
        if (isPinnedLeft(header.id)) acc.leftPinned.push(header);
        else if (header.key === 'status' || isPinnedRight(header.id)) acc.rightPinned.push(header);
        else acc.unpinned.push(header);
        return acc;
      },
      { leftPinned: [], unpinned: [], rightPinned: [] }
    );
  };

  /**
   * Renders a table header cell with sort and pin functionality
   * @param {Object} header - Header configuration
   * @returns {JSX.Element} Header cell
   */
  const renderHeaderCell = (header) => {
    if (isHidden(header.id)) return null;

    let pinnedStyle = {};
    let pinnedClass = '';
    let displayLabel = header.key === 'country' ? '#' : header.label;

    if (isPinnedLeft(header.id)) {
      pinnedStyle = { left: `${leftOffsets[header.key]}px` };
      pinnedClass = 'sticky left-0 bg-main z-10';
    } else if (header.key === 'status' || isPinnedRight(header.id)) {
      pinnedStyle = { right: `${rightOffsets[header.key]}px` };
      pinnedClass = 'sticky right-0 bg-main z-10';
    }

    return (
      <th
        key={header.id}
        scope="col"
        draggable={!isPinnedLeft(header.id) && !isPinnedRight(header.id)}
        onDragStart={(e) => handleDragStart(e, header.id)}
        onDragOver={handleDragOver}
        onDrop={(e) => handleDrop(e, header.id)}
        onDragEnd={handleDragEnd}
        style={pinnedStyle}
        className={`px-1 text-left text-primary ${pinnedClass}`}
      >
        <div className="flex items-center gap-1">
          <span className="whitespace-nowrap">{displayLabel}</span>
          {header.sortable !== false && (
            <RxCaretSort strokeWidth="0.5" onClick={() => onSort(header.key)} className={`text-base cursor-pointer ${sortConfig.sortBy === header.key ? 'text-brand' : ''}`} />
          )}
          {!['status'].includes(header.key) && (
            <button
              className="text-xs text-secondary focus:outline-none"
              onClick={(e) => {
                e.stopPropagation();
                handleTogglePin(header.id);
              }}
            >
              {isPinnedLeft(String(header.id)) || isPinnedRight(String(header.id)) ? (
                <MdPushPin className="text-primary text-base" />
              ) : (
                <MdOutlinePushPin className="text-primary text-base" />
              )}
            </button>
          )}
        </div>
      </th>
    );
  };

  /**
   * Renders a table data cell with proper positioning
   * @param {Object} row - Row data
   * @param {Object} header - Header configuration
   * @returns {JSX.Element} Data cell
   */
  const renderDataCell = (row, header) => {
    if (isHidden(header.id)) return null;

    let pinnedStyle = {};
    let pinnedClass = '';

    if (isPinnedLeft(header.id)) {
      pinnedStyle = { left: `${leftOffsets[header.key]}px` };
      pinnedClass = 'sticky left-0 bg-main z-10';
    } else if (header.key === 'status' || isPinnedRight(header.id)) {
      pinnedStyle = { right: `${rightOffsets[header.key]}px` };
      pinnedClass = 'sticky right-0 bg-main z-10';
    }

    return (
      <td key={header.key} style={pinnedStyle} className={`whitespace-nowrap px-1  font-normal ${pinnedClass}`}>
        {row[header.key]}
      </td>
    );
  };

  return (
    <div className="overflow-x-auto overflow-y-hidden">
      <table className="min-w-full divide-y divide-primary text-sm text-primary">
        <thead className="font-semibold">
          <tr>
            {selectable && (
              <th scope="col" className="p-1 text-left sticky left-0 bg-main z-20 w-[30px]">
                <Checkbox checked={selectionState.isAllSelected} onChange={handleMasterCheckboxChange} />
              </th>
            )}

            <th scope="col" style={{ left: selectable ? `${CHECKBOX_WIDTH}px` : 0 }} className="p-1 whitespace-nowrap text-left font-semibold sticky bg-main z-20 w-[30px]">
              #
            </th>

            {(() => {
              const { leftPinned, unpinned, rightPinned } = groupHeaders(headers);
              return [...leftPinned, ...unpinned, ...rightPinned].map(renderHeaderCell);
            })()}

            {actions && (
              <th scope="col" className="p-1 text-sm text-left right-0 text-primary sticky bg-main z-20">
                Actions
              </th>
            )}
          </tr>
        </thead>
        <tbody>
          {isLoading ? (
            <tr>
              <td colSpan={headers.length + (selectable ? 1 : 0) + (actions ? 1 : 0) + 1}>
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
                <tr key={row.id} className={`${selectionState.selectedItems.includes(row.id) ? 'bg-primary-faded' : 'hover:bg-hover'}`}>
                  {selectable && (
                    <td className="p-1 sticky left-0 bg-main z-20 w-[30px]">
                      <Checkbox
                        checked={selectionState.selectedItems.includes(row.id)}
                        onChange={(e) => handleRowCheckboxChange(row.id, e.nativeEvent.shiftKey)}
                        disabled={row.isSuperAdmin}
                      />
                    </td>
                  )}
                  <td style={{ left: selectable ? `${CHECKBOX_WIDTH}px` : 0 }} className="p-1 font-normal sticky bg-main z-20 w-[30px]">
                    {getSerialNumber(index)}
                  </td>

                  {(() => {
                    const { leftPinned, unpinned, rightPinned } = groupHeaders(headers);
                    return [...leftPinned, ...unpinned, ...rightPinned].map((header) => renderDataCell(row, header));
                  })()}

                  {actions && (
                    <td className={`bg-main sticky right-0 z-20`}>
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
