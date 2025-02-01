import { getMethodCall, postMethodCall, putMethodCall } from '../api-handler';

export const addTemplateCategoryApi = async (data) => {
  return await postMethodCall(`${import.meta.env.VITE_API_URL}/template-category`, data);
};

export const updateTemplateCategoryApi = async (id, data) => {
  return await putMethodCall(`${import.meta.env.VITE_API_URL}/template-category/${id}`, data);
};

export const getTemplateCategoryByIdApi = async (id) => {
  return await getMethodCall(`${import.meta.env.VITE_API_URL}/template-category/${id}`);
};

export const getAllTemplateCategoriesApi = async () => {
  return await getMethodCall(`${import.meta.env.VITE_API_URL}/template-category`);
};
