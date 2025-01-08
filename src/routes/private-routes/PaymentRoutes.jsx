import { lazy } from 'react';
import { Route, Routes } from 'react-router-dom';

const PaymentList = lazy(() => import('../../pages/payment/PaymentList'));
const PaymentIntegration = lazy(() => import('../../pages/payment/PaymentIntegration'));
const PageNotFound = lazy(() => import('../../pages/common/PageNotFound'));

const PaymentRoutes = () => {
  return (
    <Routes>
      <Route path="/payment-list" element={<PaymentList />} />
      <Route path="/payment-integration" element={<PaymentIntegration />} />
      <Route path="*" element={<PageNotFound />} />
    </Routes>
  );
};

export default PaymentRoutes;
