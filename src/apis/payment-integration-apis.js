import { getMethodCall, postMethodCall, putMethodCall } from './api-handler';

export const addPaymentIntegrationApi = (site, payment) => {
  return postMethodCall(`${import.meta.env.VITE_API_URL}/intigration`, { site, payment });
};
export const updatePaymentIntegrationApi = (site, payment = undefined, crm = undefined) => {
  return putMethodCall(`${import.meta.env.VITE_API_URL}/intigration`, { site, payment, crm });
};

export const getIntegrationBySite = async (siteId) => {
  return await getMethodCall(`${import.meta.env.VITE_API_URL}/intigration/${siteId}`);
};

export const getIntegrationByEvent = async (eventId) => {
  return await getMethodCall(`${import.meta.env.VITE_API_URL}/intigration-event/${eventId}`);
};
