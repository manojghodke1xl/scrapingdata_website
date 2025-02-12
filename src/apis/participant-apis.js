import { getMethodCall, postMethodCall } from './api-handler';

export const sendCertificateApi = async (id, unique) => {
  return await getMethodCall(`${import.meta.env.VITE_API_URL}/event/send-certificates/${id}?bookingId=${id}&unique=${unique}`);
};

export const addParticipantApi = async (data) => {
  return await postMethodCall(`${import.meta.env.VITE_API_URL}/participant`, data);
};
