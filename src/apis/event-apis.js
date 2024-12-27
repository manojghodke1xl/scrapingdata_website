import { deleteMethodCall, getMethodCall, postMethodCall, putMethodCall } from './api-handler';

export const getEventByIdApi = async (id) => {
  return await getMethodCall(`${import.meta.env.VITE_API_URL}/event/${id}?p=1`);
};

export const getAllEventsApi = async () => {
  return await getMethodCall(`${import.meta.env.VITE_API_URL}/all-events`);
};

export const addEventApi = async (data) => {
  return await postMethodCall(`${import.meta.env.VITE_API_URL}/event`, data);
};

export const updateEventApi = async (id, data) => {
  return await putMethodCall(`${import.meta.env.VITE_API_URL}/event/${id}`, data);
};

export const deleteEventApi = async (ids) => {
  return await deleteMethodCall(`${import.meta.env.VITE_API_URL}/event`, ids);
};
