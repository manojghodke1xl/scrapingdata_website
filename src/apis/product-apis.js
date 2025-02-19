import { deleteMethodCall, getMethodCall, postMethodCall, putMethodCall } from './api-handler';

export const addProductApi = async (productDetails) => {
  return await postMethodCall(`${import.meta.env.VITE_API_URL}/product`, productDetails);
};

export const updateProductApi = async (id, productDetails) => {
  return await putMethodCall(`${import.meta.env.VITE_API_URL}/product/${id}`, productDetails);
};

export const getProductByIdApi = async (id) => {
  return await getMethodCall(`${import.meta.env.VITE_API_URL}/product/${id}`);
};

export const deleteProductApi = async (ids) => {
  return await deleteMethodCall(`${import.meta.env.VITE_API_URL}/product`, {ids});
};

export const getAllProductsApi = async () => {
  return await getMethodCall(`${import.meta.env.VITE_API_URL}/all-products`);
};

export const getProductsBySiteApi = async (siteId) => {
  return await getMethodCall(`${import.meta.env.VITE_API_URL}/product-site/${siteId}`);
};
