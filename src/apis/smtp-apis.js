import { deleteMethodCall, getMethodCall, postMethodCall, putMethodCall } from './api-handler';

export const getAllSmtpsApi = async () => {
  return await getMethodCall(`${import.meta.env.VITE_API_URL}/smtp/all`);
};

export const getSmtpByIdApi = async (id) => {
  return await getMethodCall(`${import.meta.env.VITE_API_URL}/smtp/${id}`);
};

export const addSmtpApi = async (userData) => {
  return await postMethodCall(`${import.meta.env.VITE_API_URL}/smtp`, userData);
};

export const updateSmtpApi = async (id, userData) => {
  return await putMethodCall(`${import.meta.env.VITE_API_URL}/smtp/${id}`, userData);
};

export const deleteSmtpApi = async (ids) => {
  return await deleteMethodCall(`${import.meta.env.VITE_API_URL}/smtp`, { ids });
};
