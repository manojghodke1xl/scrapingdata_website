import { lazy } from 'react';

const BookingPaymentList = lazy(() => import('../../pages/payment/BookingPaymentList'));
const OrderPaymentList = lazy(() => import('../../pages/payment/OrderPaymentList'));
const ViewOrders = lazy(() => import('../../pages/orders/ViewOrders'));
const PaymentIntegration = lazy(() => import('../../pages/payment/PaymentIntegration'));

const PaymentRoutes = [
  // Route for listing all booking payments.
  { path: 'payments/booking-payment-list', Component: BookingPaymentList },
  // Route for listing all order payments.
  { path: 'payments/order-payment-list', Component: OrderPaymentList },
  // Route for viewing a specific order.
  { path: 'payments/view-order/:id', Component: ViewOrders },
  // Route for payment integration settings.
  { path: 'payments/payment-integration', Component: PaymentIntegration }
];

// Export the PaymentRoutes array as the default export.
export default PaymentRoutes;
