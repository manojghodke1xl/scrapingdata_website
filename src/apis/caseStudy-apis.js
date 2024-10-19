import { getMethodCall, postMethodCall, putMethodCall } from "./api-handler";

export const getCaseStudyById = async (id) => {
  return await getMethodCall(`${import.meta.env.VITE_API_URL}/casestudy/${id}?p=1`);
};

export const addCaseStudyApi = async (userData) => {
  return await postMethodCall(`${import.meta.env.VITE_API_URL}/casestudy`, userData);
};

export const updateCaseStudyApi = async (id, userData) => {
  return await putMethodCall(`${import.meta.env.VITE_API_URL}/casestudy/${id}`, userData);
};
