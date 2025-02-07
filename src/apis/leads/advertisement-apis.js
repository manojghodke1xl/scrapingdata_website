import { deleteMethodCall, getMethodCall, postMethodCall } from '../api-handler';

export const addAdvertisementApi = async (data) => {
  return await postMethodCall(`${import.meta.env.VITE_API_URL}/advertisement`, data);
};

export const getAdvertisementById = async (id) => {
  return await getMethodCall(`${import.meta.env.VITE_API_URL}/advertisement/${id}`);
};

export const deleteAdvertisementApi = async (ids) => {
  return await deleteMethodCall(`${import.meta.env.VITE_API_URL}/advertisement`, ids);
};
