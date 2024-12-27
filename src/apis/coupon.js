import { deleteMethodCall, getMethodCall, postMethodCall, putMethodCall } from './api-handler';

export const getCouponByIdApi = async (id) => {
  return await getMethodCall(`${import.meta.env.VITE_API_URL}/coupon/${id}`);
};

export const addCouponApi = async (data) => {
  return await postMethodCall(`${import.meta.env.VITE_API_URL}/coupon`, data);
};

export const updateCouponApi = async (id, data) => {
  return await putMethodCall(`${import.meta.env.VITE_API_URL}/coupon/${id}`, data);
};

export const deleteCouponApi = async (ids) => {
  return await deleteMethodCall(`${import.meta.env.VITE_API_URL}/coupon`, ids);
};
