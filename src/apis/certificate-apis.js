import { deleteMethodCall, getMethodCall, postMethodCall, putMethodCall } from './api-handler';

export const addCertificateApi = async (data) => {
  return await postMethodCall(`${import.meta.env.VITE_API_URL}/certificate`, data);
};

export const updateCertificateApi = async (id, data) => {
  return await putMethodCall(`${import.meta.env.VITE_API_URL}/certificate/${id}`, data);
};

export const deleteCertificatesApi = async (ids) => {
  return await deleteMethodCall(`${import.meta.env.VITE_API_URL}/certificate`, ids);
};

export const getCertificateByIdApi = async (id) => {
  return await getMethodCall(`${import.meta.env.VITE_API_URL}/certificate/${id}?p=1`);
};
