import { getMethodCall, postMethodCall, putMethodCall } from './api-handler';

export const addReminderApi = async (data) => {
  return await postMethodCall(`${import.meta.env.VITE_API_URL}/reminder`, data);
};

export const updateReminderApi = async (id, data) => {
  return await putMethodCall(`${import.meta.env.VITE_API_URL}/reminder/${id}`, data);
};

export const getReminderByIdApi = async (id) => {
  return await getMethodCall(`${import.meta.env.VITE_API_URL}/reminder/${id}`);
};

export const getExistingReminderApi = async (site, refTo) => {
  return await getMethodCall(`${import.meta.env.VITE_API_URL}/reminder/existing-reminder?site=${site}&refTo=${refTo}`);
};
