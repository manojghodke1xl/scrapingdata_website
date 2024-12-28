import { getMethodCall, postMethodCall, putMethodCall } from './api-handler';

export const getCategoryByIdApi = async (id) => {
  return await getMethodCall(`${import.meta.env.VITE_API_URL}/category/${id}`);
};

export const addCategoryApi = async (userData) => {
  return await postMethodCall(`${import.meta.env.VITE_API_URL}/category`, userData);
};

export const updateCategoryApi = async (id, userData) => {
  return await putMethodCall(`${import.meta.env.VITE_API_URL}/category/${id}`, userData);
};

export const getAllCategoriesApi = async () => {
  return await getMethodCall(`${import.meta.env.VITE_API_URL}/allcategories`);
};
