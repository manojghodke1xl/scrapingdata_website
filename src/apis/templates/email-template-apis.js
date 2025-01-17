import { deleteMethodCall, getMethodCall, postMethodCall, putMethodCall } from '../api-handler';

export const getEmailTemplateByIdApi = async (id) => {
  return await getMethodCall(`${import.meta.env.VITE_API_URL}/email-template/${id}?p=1`);
};

export const addEmailTemplateApi = async (data) => {
  return await postMethodCall(`${import.meta.env.VITE_API_URL}/email-template`, data);
};

export const updateEmailTemplateApi = async (id, data) => {
  return await putMethodCall(`${import.meta.env.VITE_API_URL}/email-template/${id}`, data);
};

export const deleteEmailTemplateApi = async (ids) => {
  return await deleteMethodCall(`${import.meta.env.VITE_API_URL}/email-template/`, ids);
};
