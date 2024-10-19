import { deleteMethodCall } from "./api-handler";

export const deleteEnquiryApi = async (ids) => {
  return await deleteMethodCall(`${import.meta.env.VITE_API_URL}/enquiry`, ids);
};
