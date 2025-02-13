import { getMethodCall, postMethodCall, putMethodCall } from './api-handler';

export const addUtmBuilderApi = async (data) => {
  return await postMethodCall(`${import.meta.env.VITE_API_URL}/utm-builder`, data);
};

export const updateUtmBuilderApi = async (id, data) => {
  return await putMethodCall(`${import.meta.env.VITE_API_URL}/utm-builder/${id}`, data);
};

export const getUtmBuilderByIdApi = async (id) => {
  return await getMethodCall(`${import.meta.env.VITE_API_URL}/utm-builder/${id}`);
};

export const deleteUtmBuildersApi = async (ids) => {
  return await getMethodCall(`${import.meta.env.VITE_API_URL}/utm-builder`, ids);
};
