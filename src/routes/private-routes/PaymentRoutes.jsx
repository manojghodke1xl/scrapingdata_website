import { lazy } from 'react';
import { Route, Routes } from 'react-router-dom';

const PaymentList = lazy(() => import('../../pages/payment/PaymentList'));

const PaymentRoutes = () => {
  return (
    <Routes>
      <Route path="/payment-list" element={<PaymentList />} />
    </Routes>
  );
};

export default PaymentRoutes;
