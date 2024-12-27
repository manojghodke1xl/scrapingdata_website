import { lazy } from 'react';
import { Route, Routes } from 'react-router-dom';

const CouponList = lazy(() => import('../../pages/coupon/CouponList'));
const AddCoupon = lazy(() => import('../../pages/coupon/AddCoupon'));

const CouponRoutes = () => {
  return (
    <Routes>
      <Route path="/coupon-list" element={<CouponList />} />
      <Route path="/add-coupon" element={<AddCoupon />} />
      <Route path="/edit-coupon/:id" element={<AddCoupon />} />
    </Routes>
  );
};

export default CouponRoutes;
