import { getMethodCall, postMethodCall } from './api-handler';

export const sendCertificateApi = async (id, unique, bookingId) => {
  return await getMethodCall(`${import.meta.env.VITE_API_URL}/event/send-certificates/${id}?${bookingId ? `bookingId=${id}` : ''}&unique=${unique}`);
};

export const addParticipantApi = async (data) => {
  return await postMethodCall(`${import.meta.env.VITE_API_URL}/participant`, data);
};

export const bulkUploadParticipantsApi = async (data) => {
  return await postMethodCall(`${import.meta.env.VITE_API_URL}/participant/import`, data);
};
