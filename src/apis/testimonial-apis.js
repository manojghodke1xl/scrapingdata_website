import { getMethodCall, postMethodCall, putMethodCall } from "./api-handler";

export const getTestimonialById = async (id) => {
  return await getMethodCall(`${import.meta.env.VITE_API_URL}/testimonial/${id}?p=1`);
};

export const addTestimonialApi = async (userData) => {
  return await postMethodCall(`${import.meta.env.VITE_API_URL}/testimonial`, userData);
};

export const updateTestimonialApi = async (id, userData) => {
  return await putMethodCall(`${import.meta.env.VITE_API_URL}/testimonial/${id}`, userData);
};
