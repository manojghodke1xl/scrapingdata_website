import { getMethodCall, postMethodCall, putMethodCall } from './api-handler';

export const getTestimonialCategoryById = async (id) => {
  return await getMethodCall(`${import.meta.env.VITE_API_URL}/testimonial-category/${id}`);
};

export const addTestimonialCategoryApi = async (userData) => {
  return await postMethodCall(`${import.meta.env.VITE_API_URL}/testimonial-category`, userData);
};

export const updateTestimonialCategoryApi = async (id, userData) => {
  return await putMethodCall(`${import.meta.env.VITE_API_URL}/testimonial-category/${id}`, userData);
};

export const getAllTestimonialCategoriesApi = async () => {
  return await getMethodCall(`${import.meta.env.VITE_API_URL}/testimonial-category/all`);
};
