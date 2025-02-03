import { deleteMethodCall, getMethodCall, postMethodCall, putMethodCall } from '../api-handler';

// email templates apis
export const getEmailTemplateByIdApi = async (id) => {
  return await getMethodCall(`${import.meta.env.VITE_API_URL}/template/email/${id}?p=1`);
};
export const addEmailTemplateApi = async (data) => {
  return await postMethodCall(`${import.meta.env.VITE_API_URL}/template/email`, data);
};
export const updateEmailTemplateApi = async (id, data) => {
  return await putMethodCall(`${import.meta.env.VITE_API_URL}/template/email/${id}`, data);
};
export const deleteEmailTemplateApi = async (ids) => {
  return await deleteMethodCall(`${import.meta.env.VITE_API_URL}/template/email`, ids);
};
export const getTemplateByEventApi = async (id) => {
  return await getMethodCall(`${import.meta.env.VITE_API_URL}/template/email/event/${id}`);
};

// sms templates apis
export const getSmsTemplateByIdApi = async (id) => {
  return await getMethodCall(`${import.meta.env.VITE_API_URL}/template/sms/${id}?p=1`);
};
export const addSmsTemplateApi = async (data) => {
  return await postMethodCall(`${import.meta.env.VITE_API_URL}/template/sms`, data);
};
export const updateSmsTemplateApi = async (id, data) => {
  return await putMethodCall(`${import.meta.env.VITE_API_URL}/template/sms/${id}`, data);
};
export const deleteSmsTemplateApi = async (ids) => {
  return await deleteMethodCall(`${import.meta.env.VITE_API_URL}/template/sms`, ids);
};
export const getSmsTemplateByEventApi = async (id) => {
  return await getMethodCall(`${import.meta.env.VITE_API_URL}/template/sms/event/${id}`);
};

// whatsapp templates apis
export const getWhatsAppTemplateByIdApi = async (id) => {
  return await getMethodCall(`${import.meta.env.VITE_API_URL}/template/whatsapp/${id}?p=1`);
};
export const addWhatsAppTemplateApi = async (data) => {
  return await postMethodCall(`${import.meta.env.VITE_API_URL}/template /whatsapp`, data);
};

export const updateWhatsAppTemplateApi = async (id, data) => {
  return await putMethodCall(`${import.meta.env.VITE_API_URL}/template/whatsapp/${id}`, data);
};

export const deleteWhatsAppTemplateApi = async (ids) => {
  return await deleteMethodCall(`${import.meta.env.VITE_API_URL}/template/whatsapp`, ids);
};

export const getWhatsAppTemplateByEventApi = async (id) => {
  return await getMethodCall(`${import.meta.env.VITE_API_URL}/template/whatsapp/event/${id}`);
};

export const getPhoneIdsApi = async (siteId) => {
  return await getMethodCall(`${import.meta.env.VITE_API_URL}/template/whatsapp/phones/${siteId}`);
};
