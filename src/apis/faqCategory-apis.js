import { getMethodCall, postMethodCall, putMethodCall } from './api-handler';

export const getFaqCategoryByIdApi = async (id) => {
  return await getMethodCall(`${import.meta.env.VITE_API_URL}/faq-category/${id}`);
};

export const addFaqCategoryApi = async (userData) => {
  return await postMethodCall(`${import.meta.env.VITE_API_URL}/faq-category`, userData);
};

export const updateFaqCategoryApi = async (id, userData) => {
  return await putMethodCall(`${import.meta.env.VITE_API_URL}/faq-category/${id}`, userData);
};

export const getAllFaqCategoriesApi = async () => {
  return await getMethodCall(`${import.meta.env.VITE_API_URL}/faq-category/all`);
};
