import { getMethodCall, putMethodCall, postMethodCallForFormWithFile, putMethodCallForFormWithFile } from './api-handler';

export const getGuideById = async (id) => {
  return await getMethodCall(`${import.meta.env.VITE_API_URL}/guide/${id}?p=1`);
};

export const addGuideApi = async (userData) => {
  // return await postMethodCall(`${import.meta.env.VITE_API_URL}/guide`, userData);
  return await postMethodCallForFormWithFile(`${import.meta.env.VITE_API_URL}/guide`, userData, true);
};

export const updateGuideApi = async (id, userData) => {
  // return await putMethodCall(`${import.meta.env.VITE_API_URL}/guide/${id}`, userData);
  return await putMethodCallForFormWithFile(`${import.meta.env.VITE_API_URL}/guide/${id}`, userData, true);
};

export const updateGuideStatusApi = async (ids, isActive) => {
  return await putMethodCall(`${import.meta.env.VITE_API_URL}/guide-status`, {
    ids,
    isActive
  });
};

export const updateGuideSitesApi = async (gids, sids, action) => {
  return await putMethodCall(`${import.meta.env.VITE_API_URL}/guide-sites`, {
    gids,
    sids,
    action
  });
};

export const getAllGuidesApi = async () => {
  return await getMethodCall(`${import.meta.env.VITE_API_URL}/allguides`);
};
