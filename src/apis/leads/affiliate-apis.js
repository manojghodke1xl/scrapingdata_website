import { deleteMethodCall, getMethodCall, postMethodCall } from '../api-handler';

export const addAffiliateApi = async (data) => {
  return await postMethodCall(`${import.meta.env.VITE_API_URL}/affiliate`, data);
};

export const getAffiliateById = async (id) => {
  return await getMethodCall(`${import.meta.env.VITE_API_URL}/affiliate/${id}`);
};

export const deleteAffiliateApi = async (ids) => {
  return await deleteMethodCall(`${import.meta.env.VITE_API_URL}/affiliate`, {ids});
};
