import RadioField from '../formFields/RadioField';
import { useState } from 'react';
// import ToggleComponent from '../formFields/ToggleComponent';
// import AdvancedFilter from '../filter/AdvancedFilterComponent';
import CustomColumnSelector from '../filter/CustomColumnSelector';
import { exportHandler } from '../../helpers/exportHandler';
import { showNotification } from '../../utils/showNotification';

const ExportDataModal = ({ isExportModalOpen, setExportModalOpen, label, selectedData, apiUrl, rows, headers, customColumns }) => {
  const [selectionState, setSelectionState] = useState({
    selectedRecords: 'currentPage',
    selectedColumns: 'visible',
    selectedData: 'allData',
    selectedFileFormat: 'csv'
  });

  const [selectedColumns, setSelectedColumns] = useState([]);

  const handleExportTable = (type) =>
    exportHandler({ type, apiUrl, rows, headers: selectionState.selectedColumns === 'customColumns' ? selectedColumns : headers, selected: selectedData.selectedItems });

  const handleDefaultState = () => setSelectionState({ selectedRecords: 'currentPage', selectedColumns: 'visible', selectedData: 'allData', selectedFileFormat: 'xlsx' });

  const handleExport = () => {
    // Define conditions for the export options
    const exportConditions = {
      all:
        selectionState.selectedRecords === 'allRecords' &&
        selectionState.selectedData === 'allData' &&
        selectionState.selectedColumns === 'allColumns' &&
        selectionState.selectedFileFormat === 'csv',
      visible:
        selectionState.selectedRecords === 'currentPage' &&
        selectionState.selectedData === 'allData' &&
        selectionState.selectedColumns === 'visible' &&
        selectionState.selectedFileFormat === 'csv',
      selected:
        selectionState.selectedRecords === 'selectedRecords' &&
        selectionState.selectedData === 'allData' &&
        selectionState.selectedColumns === 'visible' &&
        selectionState.selectedFileFormat === 'csv',
      custom:
        selectionState.selectedRecords === 'currentPage' &&
        selectionState.selectedData === 'allData' &&
        selectionState.selectedColumns === 'customColumns' &&
        selectionState.selectedFileFormat === 'csv'
    };

    // Check which condition matches and execute the corresponding export
    if (exportConditions.all) handleExportTable('all');
    else if (exportConditions.visible) handleExportTable('visible');
    else if (exportConditions.selected) handleExportTable('selected');
    else if (exportConditions.custom) handleExportTable('visible');
    else showNotification('warn', 'Please select the correct export options');
    setExportModalOpen((prev) => ({ ...prev, isExportModelOpen: false }));
    handleDefaultState();
  };

  if (!isExportModalOpen) return null;

  return (
    <div className="fixed inset-0 z-10 overflow-y-auto">
      <div
        className="fixed inset-0 bg-gray-300 bg-opacity-75 transition-opacity"
        onClick={() => {
          setExportModalOpen((prev) => ({ ...prev, isExportModelOpen: false }));
          handleDefaultState();
        }}
      />
      <div className="flex items-start justify-center w-full min-h-screen px-2 text-center lg:absolute lg:top-[12%]">
        <div className="bg-white rounded-2xl text-left overflow-hidden shadow-xl transform transition-all w-[95%] sm:w-[80%] md:w-fit px-6 2xl:px-8 py-6">
          <div className="w-full flex justify-end items-center">
            <div className=" w-full border-b border-primary mb-4 pb-4 space-y-2">
              <h4 className="w-full sm:text-xl text-dark text-left ">{label || 'Export'}</h4>
              <p className="text-md text-primary fornt-normal">Customize your export preferences below.</p>
            </div>
          </div>

          <div className="w-full flex flex-col justify-center items-center">
            <div className="border p-4 rounded-xl border-primary flex flex-col gap-2 w-full">
              <h1 className="text-primary font-semibold">Select Records to Export</h1>
              <div className="flex justify-start gap-x-5">
                <RadioField
                  id="currentPage"
                  name={'records'}
                  value="currentPage"
                  checked={selectionState.selectedRecords === 'currentPage'}
                  onChange={() => setSelectionState((prev) => ({ ...prev, selectedRecords: 'currentPage' }))}
                  label={'Current Page Records'}
                />
                <RadioField
                  id="allRecords"
                  name={'records'}
                  value="allRecords"
                  checked={selectionState.selectedRecords === 'allRecords'}
                  onChange={() => setSelectionState((prev) => ({ ...prev, selectedRecords: 'allRecords' }))}
                  label={'All Records'}
                />
                {selectedData.selectedItems.length > 0 && (
                  <RadioField
                    id="selectedRecords"
                    name={'records'}
                    value="selectedRecords"
                    checked={selectionState.selectedRecords === 'selectedRecords'}
                    onChange={() => setSelectionState((prev) => ({ ...prev, selectedRecords: 'selectedRecords' }))}
                    label={'Selected Records'}
                  />
                )}
              </div>
            </div>

            <div className="border p-4 rounded-xl border-primary flex flex-col gap-2 w-full mt-4">
              <h1 className="text-primary font-semibold">Select Data to Export</h1>
              <div className="flex justify-start gap-x-5">
                <RadioField
                  id="allData"
                  name={'data'}
                  value="allData"
                  checked={selectionState.selectedData === 'allData'}
                  onChange={() => setSelectionState((prev) => ({ ...prev, selectedData: 'allData' }))}
                  label={'All Data'}
                />
                {/* <RadioField
                  id="filteredData"
                  name={'data'}
                  value="filterdData"
                  checked={selectionState.selectedData === 'filterdData'}
                  onChange={() => setSelectionState((prev) => ({ ...prev, selectedData: 'filterdData' }))}
                  label={'Filtered Data'}
                /> */}
              </div>
              {/* {selectionState.selectedData === 'filterdData' && <AdvancedFilter />} */}
            </div>

            <div className="border p-4 rounded-xl border-primary flex flex-col gap-2 w-full mt-4">
              <h1 className="text-primary font-semibold">Select Export Columns</h1>
              <div className="flex justify-start gap-x-5">
                <RadioField
                  id="visible"
                  name={'columns'}
                  value="visible"
                  checked={selectionState.selectedColumns === 'visible'}
                  onChange={() => setSelectionState((prev) => ({ ...prev, selectedColumns: 'visible' }))}
                  label={'Visible Columns'}
                />
                <RadioField
                  id="allColumns"
                  name={'columns'}
                  value="allColumns"
                  checked={selectionState.selectedColumns === 'allColumns'}
                  onChange={() => setSelectionState((prev) => ({ ...prev, selectedColumns: 'allColumns' }))}
                  label={'All Columns'}
                />
                <RadioField
                  id="customColumns"
                  name={'columns'}
                  value="customColumns"
                  checked={selectionState.selectedColumns === 'customColumns'}
                  onChange={() => setSelectionState((prev) => ({ ...prev, selectedColumns: 'customColumns' }))}
                  label={'Custom Columns'}
                />
              </div>
              {selectionState.selectedColumns === 'customColumns' && <CustomColumnSelector customColumns={customColumns} setSelectedColumns={setSelectedColumns} />}
            </div>

            <div className="border p-4 rounded-xl border-primary flex flex-col gap-2 w-full mt-4">
              <h1 className="text-primary font-semibold">Select File Format</h1>
              <div className="flex justify-start gap-x-5">
                {/* <RadioField
                  id="xlsx"
                  name={'fileFormat'}
                  value="xlsx"
                  checked={selectionState.selectedFileFormat === 'xlsx'}
                  onChange={() => setSelectionState((prev) => ({ ...prev, selectedFileFormat: 'xlsx' }))}
                  label={'XLSX'}
                /> */}
                <RadioField
                  id="csv"
                  name={'fileFormat'}
                  value="csv"
                  checked={selectionState.selectedFileFormat === 'csv'}
                  onChange={() => setSelectionState((prev) => ({ ...prev, selectedFileFormat: 'csv' }))}
                  label={'CSV'}
                />
                {/* <RadioField
                  id="pdf"
                  name={'fileFormat'}
                  value="pdf"
                  checked={selectionState.selectedFileFormat === 'pdf'}
                  onChange={() => setSelectionState((prev) => ({ ...prev, selectedFileFormat: 'pdf' }))}
                  label={'PDF'}
                /> */}
              </div>
            </div>
            {/* <ToggleComponent label={'Save this as a preset for future exports.'} isEnableState={true} setIsEnableState={() => {}} /> */}

            <div className="border-b border-primary w-full mt-4" />
            <div className="flex justify-end gap-5 w-full mt-6 ">
              <button
                onClick={() => {
                  setExportModalOpen((prev) => ({ ...prev, isExportModelOpen: false }));
                  handleDefaultState();
                }}
                className=" w-1/4 rounded-xl border border-primary text-primary py-2 "
              >
                Cancel
              </button>
              <button onClick={handleExport} className="w-1/4 rounded-xl bg-darkblue text-white py-2 ">
                Export
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ExportDataModal;
