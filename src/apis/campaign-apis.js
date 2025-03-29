import { getMethodCall, postMethodCall, putMethodCall } from './api-handler';

export const addCampaignApi = async (data) => {
  return await postMethodCall(`${import.meta.env.VITE_API_URL}/campaign`, data);
};

export const updateCampaignApi = async (id, data) => {
  return await putMethodCall(`${import.meta.env.VITE_API_URL}/campaign/${id}`, data);
};

export const getCampaignByIdApi = async (id) => {
  return await getMethodCall(`${import.meta.env.VITE_API_URL}/campaign/${id}`);
};

export const getExistingCampaignsApi = async (site) => {
  return await getMethodCall(`${import.meta.env.VITE_API_URL}/campaign/existing-campaign?site=${site}`);
};
