import { deleteMethodCall, getMethodCall, postMethodCall, putMethodCall } from './api-handler';

export const getRecaptchaByIdApi = async (id) => {
  return await getMethodCall(`${import.meta.env.VITE_API_URL}/recaptcha/${id}?p=1`);
};

export const addRecaptchaApi = async (userData) => {
  return await postMethodCall(`${import.meta.env.VITE_API_URL}/recaptcha`, userData);
};

export const updateRecaptchaApi = async (id, userData) => {
  return await putMethodCall(`${import.meta.env.VITE_API_URL}/recaptcha/${id}`, userData);
};

export const deleteRecaptchaApi = async (ids) => {
  return await deleteMethodCall(`${import.meta.env.VITE_API_URL}/recaptcha/`, {ids});
};

export const updateRecaptchaStatusApi = async (ids, isActive) => {
  return await putMethodCall(`${import.meta.env.VITE_API_URL}/recaptcha/status`, { ids, isActive });
};

export const updateRecaptchaSitesApi = async (ids, sids, action) => {
  return await putMethodCall(`${import.meta.env.VITE_API_URL}/recaptcha/sites`, { ids, sids, action });
};
