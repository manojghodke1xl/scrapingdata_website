import { deleteMethodCall, getMethodCall } from "./api-handler";

export const deleteMailingListApi = async (ids) => {
  return await deleteMethodCall(`${import.meta.env.VITE_API_URL}/list`, ids);
};

export const getMailingListById = async (id) => {
  return await getMethodCall(`${import.meta.env.VITE_API_URL}/list/${id}?p=1`);
};
