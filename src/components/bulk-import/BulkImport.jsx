import { useState, useRef } from 'react';
import * as XLSX from 'xlsx';
import { useNavigate } from 'react-router-dom';
import { MdDeleteForever } from 'react-icons/md';
import { CiExport, CiImport } from 'react-icons/ci';
import { showNotification } from '../../utils/showNotification';
import TableComponent from '../../atoms/table/Table';
import useGlobalContext from '../../hooks/useGlobalContext';
import ImportResults from './ImportResults';

const BulkImport = ({ config }) => {
  const { title, templateFields, importApi, validateData, redirectPath, rows, getResponseHeaders } = config;
  const { setLoading } = useGlobalContext();
  const navigate = useNavigate();
  const [file, setFile] = useState(null);
  const [importData, setImportData] = useState({
    validData: [],
    invalidData: []
  });
  const [isDragging, setIsDragging] = useState(false);
  const dropZoneRef = useRef(null);
  const [apiResponse, setApiResponse] = useState(null);
  const [paginationState, setPaginationState] = useState({
    validDataPage: 1,
    validDataItemsPerPage: 25,
    invalidDataPage: 1,
    invalidDataItemsPerPage: 25
  });

  const headers = [
    ...Object.keys(templateFields).map((key) => ({
      label: key.charAt(0).toUpperCase() + key.slice(1),
      key
    }))
  ];

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (!file?.name.match(/\.(xlsx|xls)$/)) {
      showNotification('error', 'Please upload an Excel file');
      return;
    }

    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const workbook = XLSX.read(e.target.result, { type: 'binary' });
        const sheetName = workbook.SheetNames[0];
        const worksheet = workbook.Sheets[sheetName];
        const data = XLSX.utils.sheet_to_json(worksheet);

        const { valid, errors } = validateData(data);
        setImportData({ validData: valid, invalidData: errors });
        setFile({
          name: file.name,
          size: file.size / 1024 < 1024 ? `${(file.size / 1024).toFixed(2)} KB` : `${(file.size / 1024 / 1024).toFixed(2)} MB`
        });
        showNotification('success', 'File uploaded successfully');
      } catch (error) {
        showNotification('error', error.message);
      }
    };
    reader.readAsBinaryString(file);
  };

  const handleRemoveFile = () => {
    setFile(null);
    setImportData({ validData: [], invalidData: [] });
    showNotification('success', 'File removed successfully');
  };

  const downloadTemplate = () => {
    const ws = XLSX.utils.json_to_sheet([templateFields]);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Template');
    XLSX.writeFile(wb, `${title.toLowerCase()}.xlsx`);
    showNotification('success', 'Template downloaded successfully');
  };

  const handleDragEnter = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.currentTarget === dropZoneRef.current) setIsDragging(false);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);

    const droppedFiles = Array.from(e.dataTransfer.files);
    if (droppedFiles?.length > 0) {
      const excelFile = droppedFiles.find((file) => file.name.match(/\.(xlsx|xls)$/));
      if (excelFile) {
        const event = { target: { files: [excelFile] } };
        handleFileUpload(event);
      } else showNotification('error', 'Please upload an Excel file');
    }
  };

  const getPaginatedData = (data, page, itemsPerPage) => {
    const startIndex = (page - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return data.slice(startIndex, endIndex);
  };

  const handleImport = async () => {
    setLoading(true);
    try {
      const { status, data } = await importApi(importData.validData);
      if (status) {
        setApiResponse(data.data);
        setFile(null);
        setImportData({ validData: [], invalidData: [] });
      } else showNotification('warn', data);
    } catch (error) {
      showNotification('error', error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-8 flex flex-col min-h-screen mb-20">
      <div className="w-full pb-4 border-b border-primary gap-y-4 gap-2 flex flex-col items-start md:flex-row lg:flex-col xl:flex-row justify-between lg:items-start md:items-end xl:items-end mb-4">
        <span className="text-3xl font-semibold text-dark">Bulk Import {title}</span>
      </div>

      <div className="flex justify-center">
        {apiResponse ? (
          <ImportResults apiResponse={apiResponse} rows={rows} getResponseHeaders={getResponseHeaders} onClick={() => navigate(redirectPath)} />
        ) : (
          <>
            {file ? (
              <div className="w-full">
                <div className="flex flex-col md:flex-row items-center mb-4 justify-between w-full gap-5">
                  <div className="flex items-center gap-2 border p-2 rounded-xl border-primary mb-4 md:mb-0 w-fit">
                    <span className="text-dark text-base">{file.name}</span>
                    <span className="text-sm text-secondary">({file.size})</span>
                    <button className="p-2 rounded-lg hover:bg-hover" onClick={handleRemoveFile}>
                      <MdDeleteForever className="text-2xl text-failed" />
                    </button>
                  </div>
                  <div className="w-full md:w-auto">
                    <div className="flex flex-col md:flex-row justify-between mb-4 gap-2 md:gap-5">
                      <div className="text-dark text-base">Total Records: {importData.validData.length + importData.invalidData.length}</div>
                      <div className="text-success text-base">Valid Records: {importData.validData.length}</div>
                      <div className="text-failed text-base">Invalid Records: {importData.invalidData.length}</div>
                    </div>
                  </div>
                </div>

                {importData.validData.length > 0 && (
                  <div>
                    <h4 className="text-lg font-medium">Valid Data</h4>
                    <TableComponent
                      headers={headers}
                      rows={getPaginatedData(importData.validData, paginationState.validDataPage, paginationState.validDataItemsPerPage)}
                      tableData={() => {}}
                      exportBtn={false}
                      shouldFetchData={false}
                      pagination={true}
                      currentPage={paginationState.validDataPage}
                      itemsPerPage={paginationState.validDataItemsPerPage}
                      totalCount={importData.validData.length}
                      onPageChange={(page) => setPaginationState((prev) => ({ ...prev, validDataPage: page }))}
                      onItemsPerPageChange={(items) => setPaginationState((prev) => ({ ...prev, validDataItemsPerPage: items, validDataPage: 1 }))}
                    />
                  </div>
                )}

                <div className="flex justify-end gap-4">
                  <button
                    onClick={() => {
                      setFile(null);
                      setImportData({ validData: [], invalidData: [] });
                    }}
                    className="px-4 rounded-xl border-2 border-primary py-2 text-dark"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleImport}
                    disabled={importData.validData.length === 0}
                    className={`px-4 rounded-xl py-2 bg-primary text-white ${importData.validData.length === 0 && 'opacity-50 cursor-not-allowed'}`}
                  >
                    Import
                  </button>
                </div>

                {importData.invalidData.length > 0 && (
                  <div>
                    <h4 className="text-lg font-medium text-failed mb-2">Invalid Data</h4>
                    <TableComponent
                      headers={headers}
                      rows={getPaginatedData(importData.invalidData, paginationState.invalidDataPage, paginationState.invalidDataItemsPerPage)}
                      tableData={() => {}}
                      exportBtn={false}
                      shouldFetchData={false}
                      pagination={true}
                      currentPage={paginationState.invalidDataPage}
                      itemsPerPage={paginationState.invalidDataItemsPerPage}
                      totalCount={importData.invalidData.length}
                      onPageChange={(page) => setPaginationState((prev) => ({ ...prev, invalidDataPage: page }))}
                      onItemsPerPageChange={(items) => setPaginationState((prev) => ({ ...prev, invalidDataItemsPerPage: items, invalidDataPage: 1 }))}
                    />
                  </div>
                )}
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center w-full max-w-3xl translate-y-1/3 text-center">
                <div className="flex flex-col items-center justify-between w-full gap-4 sm:gap-2 mb-5">
                  <p className="text-dark text-center sm:text-left mb-2 sm:mb-0">Upload a XLSX file to import {title.toLowerCase()}. Use our template to get started.</p>
                  <button onClick={downloadTemplate} className="flex items-center justify-center gap-2 w-full  py-2.5 px-2 rounded-xl border border-primary">
                    <CiImport strokeWidth={0.5} className="text-2xl" />
                    <span>Download Template</span>
                  </button>
                </div>
                <div
                  ref={dropZoneRef}
                  className={`p-5 bg-main text-dark flex flex-col justify-center rounded-lg w-full items-center border-dashed border-2 
                    ${isDragging ? 'border-primary bg-primary/10' : 'border-primary'} cursor-pointer transition-colors duration-200`}
                  onDragEnter={handleDragEnter}
                  onDragOver={handleDragOver}
                  onDragLeave={handleDragLeave}
                  onDrop={handleDrop}
                >
                  <input id="hidden-input" type="file" className="hidden" accept=".xlsx,.xls" onChange={handleFileUpload} />
                  <label htmlFor="hidden-input" className="flex flex-col w-full py-12 justify-center items-center cursor-pointer">
                    <CiExport strokeWidth={1.5} size={24} className="mb-2" />
                    <p className="text-lg text-dark text-center mb-2">{isDragging ? 'Drop Excel file here' : 'Choose a file or drag & drop here to upload'}</p>
                    <span className="font-normal text-sm">Accepted file types: xlsx</span>
                  </label>
                </div>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default BulkImport;
