import { lazy } from 'react';
import { Route, Routes } from 'react-router-dom';

const Apps = lazy(() => import('../../pages/integration/Apps'));
const IntegrationHub = lazy(() => import('../../pages/integration/IntegrationHub'));
const RazorpayIntegration = lazy(() => import('../../pages/integration/RazorpayIntegration'));
const StripeIntegration = lazy(() => import('../../pages/integration/StripeIntegration'));
const PaypalIntegration = lazy(() => import('../../pages/integration/PaypalIntegration'));

const IntegrationRoutes = () => {
  return (
    <Routes>
      <Route path="/app" element={<Apps />} />
      <Route path="/integration" element={<IntegrationHub />} />
      <Route path="/integration/razorpay" element={<RazorpayIntegration />} />
      <Route path="/integration/stripe" element={<StripeIntegration />} />
      <Route path="/integration/paypal" element={<PaypalIntegration />} />
    </Routes>
  );
};

export default IntegrationRoutes;
