import { getMethodCall, postMethodCall, putMethodCall } from './api-handler';

export const addBroadcastApi = async (data) => {
  return await postMethodCall(`${import.meta.env.VITE_API_URL}/broadcast`, data);
};

export const updateBroadcastApi = async (id, data) => {
  return await putMethodCall(`${import.meta.env.VITE_API_URL}/broadcast/${id}`, data);
};

export const getBroadcastByIdApi = async (id) => {
  return await getMethodCall(`${import.meta.env.VITE_API_URL}/broadcast/${id}`);
};

export const getExistingBroadcastApi = async (site, refTo) => {
  return await getMethodCall(`${import.meta.env.VITE_API_URL}/broadcast/existing-broadcast?site=${site}&refTo=${refTo}`);
};
