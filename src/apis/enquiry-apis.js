import { deleteMethodCall, getMethodCall } from "./api-handler";

export const deleteEnquiryApi = async (ids) => {
  return await deleteMethodCall(`${import.meta.env.VITE_API_URL}/enquiry`, ids);
};

export const getEnquiryById = async (id) => {
  return await getMethodCall(`${import.meta.env.VITE_API_URL}/enquiry/${id}?p=1`);
};
