import { getMethodCall } from "./api-handler";

export const getAllSitesApi = async () => {
  return await getMethodCall(`${import.meta.env.VITE_API_URL}/allSites`);
};
