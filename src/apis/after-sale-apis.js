import { postMethodCall } from './api-handler';

export const AddAfterSaleApi = async (data) => {
  return await postMethodCall(`${import.meta.env.VITE_API_URL}/after-sale`, data);
};
