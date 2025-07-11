import { deleteMethodCall, getMethodCall, postMethodCall, putMethodCall } from './api-handler';

const BASE_URL = import.meta.env.VITE_API_URL;

// Add new meta tag
export const addMetaDataApi = async (metaDetails) => {
  console.log(metaDetails);
  return await postMethodCall(`${BASE_URL}/metadata`, metaDetails);
};

// Update existing meta tag by ID
export const updateMetaDataApi = async (id, metaDetails) => {
  return await putMethodCall(`${BASE_URL}/metadata/${id}`, metaDetails);
};

// Get meta tag by ID
export const getMetaDataByIdApi = async (id) => {
  return await getMethodCall(`${BASE_URL}/metadata/${id}`);
};

// Delete one or multiple meta tags by IDs
export const deleteMetaDataApi = async (ids) => {
  return await deleteMethodCall(`${BASE_URL}/metadata-delete`, { ids });
};

// Get all meta tags
export const getAllMetaDataApi = async () => {
  return await getMethodCall(`${BASE_URL}/all-metadata`);
};

// (Optional) Get meta tags filtered by page name
export const getMetaDataByPageApi = async (pageName) => {
  return await getMethodCall(`${BASE_URL}/metadata-page/${pageName}`);
};
