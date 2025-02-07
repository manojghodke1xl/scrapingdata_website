import { deleteMethodCall, getMethodCall, postMethodCall } from '../api-handler';

export const addFanClubApi = async (data) => {
  return await postMethodCall(`${import.meta.env.VITE_API_URL}/fanClub`, data);
};

export const getFanClubById = async (id) => {
  return await getMethodCall(`${import.meta.env.VITE_API_URL}/fanClub/${id}`);
};

export const deleteFanClubApi = async (ids) => {
  return await deleteMethodCall(`${import.meta.env.VITE_API_URL}/fanClub`, ids);
};
