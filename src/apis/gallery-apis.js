import { deleteMethodCall, getMethodCall, postMethodCall, putMethodCall } from './api-handler';

export const getGalleryById = async (id) => {
  return await getMethodCall(`${import.meta.env.VITE_API_URL}/gallery/${id}?p=1`);
};

export const addGalleryApi = async (userData) => {
  return await postMethodCall(`${import.meta.env.VITE_API_URL}/gallery`, userData);
};

export const updateGalleryApi = async (id, userData) => {
  return await putMethodCall(`${import.meta.env.VITE_API_URL}/gallery/${id}`, userData);
};

export const updateGalleryStatusApi = async (ids, isActive) => {
  return await putMethodCall(`${import.meta.env.VITE_API_URL}/gallery-status`, {
    ids,
    isActive
  });
};

export const updateGallerySitesApi = async (gids, sids, action) => {
  return await putMethodCall(`${import.meta.env.VITE_API_URL}/gallery-sites`, { gids, sids, action });
};

export const deleteGalleryApi = async (ids) => {
  return await deleteMethodCall(`${import.meta.env.VITE_API_URL}/gallery`, ids);
};
