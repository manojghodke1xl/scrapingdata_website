import { deleteMethodCall, getMethodCall, postMethodCall, putMethodCall } from './api-handler';

export const getNotifAgentByIdApi = async (id) => {
  return await getMethodCall(`${import.meta.env.VITE_API_URL}/notif-agent/${id}`);
};

export const addNotifAgentApi = async (data) => {
  return await postMethodCall(`${import.meta.env.VITE_API_URL}/notif-agent`, data);
};

export const updateNotifAgentApi = async (id, data) => {
  return await putMethodCall(`${import.meta.env.VITE_API_URL}/notif-agent/${id}`, data);
};

export const updateNotifAgentStatusApi = async (ids, isBlocked) => {
  return await putMethodCall(`${import.meta.env.VITE_API_URL}/notif-agent/status`, { ids, isBlocked });
};

export const deleteNotifAgentApi = async (ids) => {
  return await deleteMethodCall(`${import.meta.env.VITE_API_URL}/notif-agent`, ids);
};

export const getNotifAgentBySiteApi = async (siteId) => {
  return await getMethodCall(`${import.meta.env.VITE_API_URL}/notif-agent/site/${siteId}`);
};
