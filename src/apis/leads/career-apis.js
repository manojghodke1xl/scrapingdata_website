import { deleteMethodCall, getMethodCall, postMethodCall } from '../api-handler';

export const addCareerApi = async (data) => {
  return await postMethodCall(`${import.meta.env.VITE_API_URL}/career`, data);
};

export const getCareerById = async (id) => {
  return await getMethodCall(`${import.meta.env.VITE_API_URL}/career/${id}`);
};

export const deleteCareerApi = async (ids) => {
  return await deleteMethodCall(`${import.meta.env.VITE_API_URL}/career`, ids);
};
