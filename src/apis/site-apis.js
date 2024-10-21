import { getMethodCall, postMethodCall, putMethodCall } from "./api-handler";

export const getAllSitesApi = async () => {
  return await getMethodCall(`${import.meta.env.VITE_API_URL}/allSites`);
};

export const addPopupApi = async (userData) => {
  return await postMethodCall(`${import.meta.env.VITE_API_URL}/popup`, userData);
};

export const updatePopupApi = async (id, userData) => {
  return await putMethodCall(`${import.meta.env.VITE_API_URL}/popup/${id}`, userData);
};

export const getSiteByIdApi = async (id) => {
  return await getMethodCall(`${import.meta.env.VITE_API_URL}/site/${id}`);
};

export const addSiteApi = async (userData) => {
  return await postMethodCall(`${import.meta.env.VITE_API_URL}/site`, userData);
};

export const updateSiteApi = async (id, userData) => {
  return await putMethodCall(`${import.meta.env.VITE_API_URL}/site/${id}`, userData);
};
