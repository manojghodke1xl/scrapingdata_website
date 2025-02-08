import { getMethodCall } from './api-handler';

export const sendCertificateApi = async (id) => {
  return await getMethodCall(`${import.meta.env.VITE_API_URL}/event/send-certificates/${id}?bookingId=${id}`);
};
