import { useState } from 'react';
import TableComponent from '../../atoms/table/Table';

const ImportResults = ({ apiResponse, rows, getResponseHeaders, onClick }) => {
  const [responseDataPagination, setResponseDataPagination] = useState({
    successPage: 1,
    successItemsPerPage: 25,
    failedPage: 1,
    failedItemsPerPage: 25
  });
  const getPaginatedResponseData = (data, currentPage, itemsPerPage) => {
    if (!data) return [];
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return data.slice(startIndex, endIndex);
  };

  return (
    <div className="w-full mt-5">
      <h3 className="text-xl font-semibold mb-4">Import Results</h3>
      {apiResponse.successful?.count > 0 && (
        <div className="mb-6">
          <h4 className="text-lg font-medium text-success mb-2">Successful Imports ({apiResponse.successful.count})</h4>
          <TableComponent
            headers={getResponseHeaders(apiResponse.successful.items)}
            rows={getPaginatedResponseData(rows(apiResponse.successful.items), responseDataPagination.successPage, responseDataPagination.successItemsPerPage)}
            tableData={() => {}}
            exportBtn={false}
            shouldFetchData={false}
            pagination={true}
            currentPage={responseDataPagination.successPage}
            itemsPerPage={responseDataPagination.successItemsPerPage}
            totalCount={apiResponse.successful.count}
            onPageChange={(page) => setResponseDataPagination((prev) => ({ ...prev, successPage: page }))}
            onItemsPerPageChange={(items) =>
              setResponseDataPagination((prev) => ({
                ...prev,
                successItemsPerPage: items,
                successPage: 1
              }))
            }
          />
        </div>
      )}

      {apiResponse.failed?.count > 0 && (
        <div>
          <h4 className="text-lg font-medium text-failed mb-2">Failed Imports ({apiResponse.failed.count})</h4>
          <TableComponent
            headers={getResponseHeaders(apiResponse.failed.items)}
            rows={getPaginatedResponseData(rows(apiResponse.failed.items), responseDataPagination.failedPage, responseDataPagination.failedItemsPerPage)}
            tableData={() => {}}
            exportBtn={false}
            shouldFetchData={false}
            pagination={true}
            currentPage={responseDataPagination.failedPage}
            itemsPerPage={responseDataPagination.failedItemsPerPage}
            totalCount={apiResponse.failed.count}
            onPageChange={(page) => setResponseDataPagination((prev) => ({ ...prev, failedPage: page }))}
            onItemsPerPageChange={(items) =>
              setResponseDataPagination((prev) => ({
                ...prev,
                failedItemsPerPage: items,
                failedPage: 1
              }))
            }
          />
        </div>
      )}

      <div className="flex justify-end gap-4 mt-4">
        <button onClick={onClick} className="px-4 rounded-xl py-2 bg-primary text-white">
          Back
        </button>
      </div>
    </div>
  );
};

export default ImportResults;
