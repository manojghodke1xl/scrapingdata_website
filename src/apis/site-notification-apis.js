import { getMethodCall, postMethodCall } from './api-handler';

export const addAndUpdateSiteNotificationApi = async (userData) => {
  return await postMethodCall(`${import.meta.env.VITE_API_URL}/site-notification`, userData);
};

export const getSiteNotificationByIdApi = async (id) => {
  return await getMethodCall(`${import.meta.env.VITE_API_URL}/site-notification/${id}`);
};
