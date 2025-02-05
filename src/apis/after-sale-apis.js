import { getMethodCall, postMethodCall, putMethodCall } from './api-handler';

export const addAfterSaleApi = async (data) => {
  return await postMethodCall(`${import.meta.env.VITE_API_URL}/after-sale`, data);
};

export const getAfterSaleTemplateApi = async ({ site, event, type }) => {
  return await getMethodCall(`${import.meta.env.VITE_API_URL}/after-sale/templates?site=${site}&event=${event}&type=${type}`);
};

export const updateAfterSaleApi = async (id, data) => {
  return await putMethodCall(`${import.meta.env.VITE_API_URL}/after-sale/${id}`, data);
};

export const getAfterSalesByIdApi = async (id) => {
  return await getMethodCall(`${import.meta.env.VITE_API_URL}/after-sale/${id}`);
};

export const getExistingAfterSalesApi = async (site, refTo) => {
  return await getMethodCall(`${import.meta.env.VITE_API_URL}/after-sale/existing-after-sales?site=${site}&refTo=${refTo}`);
};
