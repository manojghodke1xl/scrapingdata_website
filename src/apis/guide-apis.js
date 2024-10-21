import { getMethodCall, postMethodCall, putMethodCall } from "./api-handler";

export const getGuideById = async (id) => {
  return await getMethodCall(`${import.meta.env.VITE_API_URL}/guide/${id}?p=1`);
};

export const addGuideApi = async (userData) => {
  return await postMethodCall(`${import.meta.env.VITE_API_URL}/guide`, userData);
};

export const updateGuideApi = async (id, userData) => {
  return await putMethodCall(`${import.meta.env.VITE_API_URL}/guide/${id}`, userData);
};

export const updateGuideStatusApi = async (ids, isActive) => {
  return await putMethodCall(`${import.meta.env.VITE_API_URL}/guide-status`, { ids, isActive });
};

export const updateGuideSitesApi = async (gids, sids, action) => {
  return await putMethodCall(`${import.meta.env.VITE_API_URL}/guide-sites`, { cids: gids, sids, action });
};

export const getAllGuidesApi = async () => {
  return await getMethodCall(`${import.meta.env.VITE_API_URL}/allguides`);
};
