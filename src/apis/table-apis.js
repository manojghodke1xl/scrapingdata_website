import { getMethodCall, postMethodCall } from './api-handler';

export const createAndUpdateTableColumnApi = async (data) => {
  return await postMethodCall(`${import.meta.env.VITE_API_URL}/column-preference`, data);
};

export const getTableColumnApi = async (tableName) => {
  return await getMethodCall(`${import.meta.env.VITE_API_URL}/column-preference?tableName=${tableName}`);
};

export const bulkExportTableApi = async (apiUrl) => {
  return await getMethodCall(`${import.meta.env.VITE_API_URL}/${apiUrl}`);
};
