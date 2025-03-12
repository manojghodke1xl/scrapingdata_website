import { lazy } from 'react';
import { Route, Routes } from 'react-router-dom';

const BookingPaymentList = lazy(() => import('../../pages/payment/BookingPaymentList'));
const OrderPaymentList = lazy(() => import('../../pages/payment/OrderPaymentList'));
const ViewOrders = lazy(() => import('../../pages/orders/ViewOrders'));
const PaymentIntegration = lazy(() => import('../../pages/payment/PaymentIntegration'));
const PageNotFound = lazy(() => import('../../pages/common/PageNotFound'));

const PaymentRoutes = () => {
  return (
    <Routes>
      <Route path="/booking-payment-list" element={<BookingPaymentList />} />
      <Route path="/order-payment-list" element={<OrderPaymentList />} />
      <Route path="/view-order/:id" element={<ViewOrders />} />
      <Route path="/payment-integration" element={<PaymentIntegration />} />
      <Route path="*" element={<PageNotFound />} />
    </Routes>
  );
};

export default PaymentRoutes;
