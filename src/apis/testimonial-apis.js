import { deleteMethodCall, getMethodCall, postMethodCall, putMethodCall } from './api-handler';

export const getTestimonialById = async (id) => {
  return await getMethodCall(`${import.meta.env.VITE_API_URL}/testimonial/${id}?p=1`);
};

export const addTestimonialApi = async (userData) => {
  return await postMethodCall(`${import.meta.env.VITE_API_URL}/testimonial`, userData);
};

export const updateTestimonialApi = async (id, userData) => {
  return await putMethodCall(`${import.meta.env.VITE_API_URL}/testimonial/${id}`, userData);
};

export const updateTestimonialStatusApi = async (ids, isActive) => {
  return await putMethodCall(`${import.meta.env.VITE_API_URL}/testimonial-status`, { ids, isActive });
};
export const updateTestimonialSitesApi = async (tids, sids, action) => {
  return await putMethodCall(`${import.meta.env.VITE_API_URL}/testimonial-sites`, { tids, sids, action });
};

export const deleteTestimonialApi = async (ids) => {
  return await deleteMethodCall(`${import.meta.env.VITE_API_URL}/testimonial`, ids);
};
