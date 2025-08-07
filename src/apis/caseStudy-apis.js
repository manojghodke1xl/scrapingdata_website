import { getMethodCall, putMethodCall, postMethodCallForFormWithFile, putMethodCallForFormWithFile } from './api-handler';

export const getCaseStudyById = async (id) => {
  return await getMethodCall(`${import.meta.env.VITE_API_URL}/casestudy/${id}?p=1`);
};

export const addCaseStudyApi = async (userData) => {
  // return await postMethodCall(`${import.meta.env.VITE_API_URL}/casestudy`, userData);
  return await postMethodCallForFormWithFile(`${import.meta.env.VITE_API_URL}/casestudy`, userData, true);
};

export const updateCaseStudyApi = async (id, userData) => {
  // return await putMethodCall(`${import.meta.env.VITE_API_URL}/casestudy/${id}`, userData);
  return await putMethodCallForFormWithFile(`${import.meta.env.VITE_API_URL}/casestudy/${id}`, userData, true);
};

export const updateCaseStudyStatusApi = async (ids, isActive) => {
  return await putMethodCall(`${import.meta.env.VITE_API_URL}/casestudy-status`, { ids, isActive });
  // return await putMethodCallForFormWithFile(`${import.meta.env.VITE_API_URL}/casestudy-status`, { ids, isActive });
};

export const updateCaseStudySitesApi = async (cids, sids, action) => {
  return await putMethodCall(`${import.meta.env.VITE_API_URL}/casestudy-sites`, { cids, sids, action });
  // return await putMethodCallForFormWithFile(`${import.meta.env.VITE_API_URL}/casestudy-sites`, { cids, sids, action });
};

export const getAllCaseStudyApi = async () => {
  return await getMethodCall(`${import.meta.env.VITE_API_URL}/allcasestudies`);
};
