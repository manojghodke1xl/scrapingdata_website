import { deleteMethodCall, getMethodCall, postMethodCall, putMethodCall } from "./api-handler";

export const getPartnerLogoById = async (id) => {
  return await getMethodCall(`${import.meta.env.VITE_API_URL}/partner-logo/${id}?p=1`);
};

export const addPartnerLogoApi = async (userData) => {
  return await postMethodCall(`${import.meta.env.VITE_API_URL}/partner-logo`, userData);
};

export const updatePartnerLogoApi = async (id, userData) => {
  return await putMethodCall(`${import.meta.env.VITE_API_URL}/partner-logo/${id}`, userData);
};

export const updatePartnerLogoStatusApi = async (ids, isActive) => {
  return await putMethodCall(`${import.meta.env.VITE_API_URL}/partner-logo-status`, {
    ids,
    isActive,
  });
};

export const updatePartnerLogoSitesApi = async (pids, sids, action) => {
  return await putMethodCall(`${import.meta.env.VITE_API_URL}/partner-logo-sites`, {
    pids,
    sids,
    action,
  });
};

export const deletePartnerLogoApi = async (ids) => {
  return await deleteMethodCall(`${import.meta.env.VITE_API_URL}/partner-logo`, ids);
};
