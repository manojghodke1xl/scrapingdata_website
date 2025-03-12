import { getMethodCall } from './api-handler';

export const getOrderDetailsByIdApi = async (id) => {
  return await getMethodCall(`${import.meta.env.VITE_API_URL}/order/${id}`);
};
