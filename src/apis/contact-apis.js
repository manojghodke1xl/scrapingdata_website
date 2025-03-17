import { getMethodCall, postMethodCall, putMethodCall } from './api-handler';

export const addContactApi = async (data) => {
  return await postMethodCall(`${import.meta.env.VITE_API_URL}/contact`, data);
};

export const updateContactApi = async (id, data) => {
  return await putMethodCall(`${import.meta.env.VITE_API_URL}/contact/${id}`, data);
};

export const getContactByIdApi = async (id) => {
  return await getMethodCall(`${import.meta.env.VITE_API_URL}/contact/${id}`);
};

export const bulkUploadContactsApi = async (data) => {
  return await postMethodCall(`${import.meta.env.VITE_API_URL}/contact/import`, data);
};
