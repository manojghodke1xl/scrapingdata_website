import { getMethodCall } from './api-handler';

export const getPaymentById = async (id) => {
  return await getMethodCall(`${import.meta.env.VITE_API_URL}/payment/${id}`);
};
