import { getMethodCall, postMethodCall, putMethodCall } from './api-handler';

export const addWebinarApi = async (data) => {
  return await postMethodCall(`${import.meta.env.VITE_API_URL}/webinar`, data);
};

export const updateWebinarApi = async (id, data) => {
  return await putMethodCall(`${import.meta.env.VITE_API_URL}/webinar/${id}`, data);
};

export const getWebinarByIdApi = async (id) => {
  return await getMethodCall(`${import.meta.env.VITE_API_URL}/webinar/${id}`);
};
