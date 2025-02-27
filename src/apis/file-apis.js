import { deleteMethodCall, getMethodCall, postMethodCall, putMethodCall } from './api-handler';

export const addFileApi = async (userData) => {
  return await postMethodCall(`${import.meta.env.VITE_API_URL}/file`, userData);
};

export const updateFileApi = async (id, userData) => {
  return await putMethodCall(`${import.meta.env.VITE_API_URL}/file/${id}`, userData);
};

export const getFileByIdApi = async (id) => {
  return await getMethodCall(`${import.meta.env.VITE_API_URL}/file/${id}?p=1`);
};

export const deleteFileApi = async (ids) => {
  return await deleteMethodCall(`${import.meta.env.VITE_API_URL}/file`, { ids });
};

export const getFilesBySiteIdApi = async (id) => {
  return await getMethodCall(`${import.meta.env.VITE_API_URL}/site/${id}`);
};

export const updateFileNameApi = async (id, name) => {
  return await putMethodCall(`${import.meta.env.VITE_API_URL}/file/name`, { id, name });
};
