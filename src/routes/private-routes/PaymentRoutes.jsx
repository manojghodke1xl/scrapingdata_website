import { lazy } from 'react';
import { Route, Routes } from 'react-router-dom';

const PaymentList = lazy(() => import('../../pages/payment/PaymentList'));
const PageNotFound = lazy(() => import('../../pages/common/PageNotFound'));

const PaymentRoutes = () => {
  return (
    <Routes>
      <Route path="/payment-list" element={<PaymentList />} />
      <Route path="*" element={<PageNotFound />} />
    </Routes>
  );
};

export default PaymentRoutes;
