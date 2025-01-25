import { deleteMethodCall, getMethodCall, postMethodCall } from './api-handler';

export const getFeedbackByIdApi = async (fid) => {
  return await getMethodCall(`${import.meta.env.VITE_API_URL}/feedback/${fid}?p=1`);
};
export const deleteFeedbackApi = async (ids) => {
  return await deleteMethodCall(`${import.meta.env.VITE_API_URL}/feedback`, ids);
};

export const addFeedbackApi = async (data) => {
  return await postMethodCall(`${import.meta.env.VITE_API_URL}/feedback`, data);
};
