import { useState } from 'react';
import TableComponent from '../../atoms/table/Table';

/**
 * ImportResults component
 *
 * This component shows the results of the import operation.
 * It displays two tables, one for successful imports and one for failed imports.
 * The tables are paginated and the user can change the page and the number of items per page.
 * The component also has a button to go back to the previous page.
 *
 * @param {Object} apiResponse The response from the API with the import results
 * @param {Function} rows A function that takes the data and returns an array of objects that can be used to render the import results table
 * @param {Function} getResponseHeaders A function that takes the data and returns an array of objects that can be used to render the import results table headers
 * @param {Function} onClick A function that is called when the user clicks the back button
 * @returns A JSX element with the import results component
 */
const ImportResults = ({ apiResponse, rows, getResponseHeaders, onClick }) => {
  // State to store the pagination data for the successful and failed imports
  const [responseDataPagination, setResponseDataPagination] = useState({
    // Initial page for successful imports
    successPage: 1,
    // Initial number of items per page for successful imports
    successItemsPerPage: 25,
    // Initial page for failed imports
    failedPage: 1,
    // Initial number of items per page for failed imports
    failedItemsPerPage: 25
  });

  // Function to get the paginated response data
  const getPaginatedResponseData = (data, currentPage, itemsPerPage) => {
    if (!data) return [];
    // Calculate the start index based on the current page and the number of items per page
    const startIndex = (currentPage - 1) * itemsPerPage;
    // Calculate the end index based on the start index and the number of items per page
    const endIndex = startIndex + itemsPerPage;
    // Return the paginated data
    return data.slice(startIndex, endIndex);
  };

  // Render the component
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

