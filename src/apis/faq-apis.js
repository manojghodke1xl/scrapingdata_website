import { deleteMethodCall, getMethodCall, postMethodCall, putMethodCall } from './api-handler';

export const addFaqApi = async (userData) => {
  return await postMethodCall(`${import.meta.env.VITE_API_URL}/faq`, userData);
};

export const updateFaqApi = async (id, userData) => {
  return await putMethodCall(`${import.meta.env.VITE_API_URL}/faq/${id}`, userData);
};

export const getFaqByIdApi = async (id) => {
  return await getMethodCall(`${import.meta.env.VITE_API_URL}/faq/${id}?p=1`);
};
export const updateFaqStatusApi = async (ids, isActive) => {
  return await putMethodCall(`${import.meta.env.VITE_API_URL}/faq-status`, { ids, isActive });
};

export const updateFaqSitesApi = async (ids, sids, action) => {
  return await putMethodCall(`${import.meta.env.VITE_API_URL}/faq-sites`, { ids, sids, action });
};

export const deleteFaqApi = async (ids) => {
  return await deleteMethodCall(`${import.meta.env.VITE_API_URL}/faq`, ids);
};
