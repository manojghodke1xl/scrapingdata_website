import { deleteMethodCall, getMethodCall, postMethodCall, putMethodCall } from './api-handler';

export const addEventTicketApi = async (userData) => {
  return await postMethodCall(`${import.meta.env.VITE_API_URL}/ticket`, userData);
};

export const updateEventTicketApi = async (id, userData) => {
  return await putMethodCall(`${import.meta.env.VITE_API_URL}/ticket/${id}`, userData);
};

export const deleteEventTicketApi = async (ids) => {
  return await deleteMethodCall(`${import.meta.env.VITE_API_URL}/ticket`, ids);
};

export const getEventTicketByIdApi = async (id) => {
  return await getMethodCall(`${import.meta.env.VITE_API_URL}/ticket/${id}?p=1`);
};

export const getAllTicketsApi = async () => {
  return await getMethodCall(`${import.meta.env.VITE_API_URL}/ticket`);
};
