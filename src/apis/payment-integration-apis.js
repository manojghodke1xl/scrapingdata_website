import { getMethodCall, putMethodCall } from './api-handler';

export const updatePaymentIntegrationApi = (site, payment = undefined, crm = undefined, social = undefined) => {
  return putMethodCall(`${import.meta.env.VITE_API_URL}/integration`, { site, payment, crm, social });
};

export const getIntegrationBySite = async (siteId) => {
  return await getMethodCall(`${import.meta.env.VITE_API_URL}/integration/${siteId}`);
};

export const getIntegrationByEvent = async (eventId) => {
  return await getMethodCall(`${import.meta.env.VITE_API_URL}/integration/event/${eventId}`);
};
