import { getMethodCall, postMethodCall } from './api-handler';

export const AddAfterSaleApi = async (data) => {
  return await postMethodCall(`${import.meta.env.VITE_API_URL}/after-sale`, data);
};

export const getAfterSaleTemplateApi = async ({ site, event, type }) => {
  return await getMethodCall(`${import.meta.env.VITE_API_URL}/after-sale/templates?site=${site}&event=${event}&type=${type}`);
};
