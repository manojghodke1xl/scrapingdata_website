import { getMethodCall, postMethodCall, putMethodCall } from "./api-handler";

export const getGuideById = async (id) => {
  return await getMethodCall(`${import.meta.env.VITE_API_URL}/guide/${id}?p=1`);
};

export const addGuideApi = async (userData) => {
  return await postMethodCall(`${import.meta.env.VITE_API_URL}/guide`, userData);
};

export const updateGuideApi = async (id, userData) => {
  return await putMethodCall(`${import.meta.env.VITE_API_URL}/guide/${id}`, userData);
};
