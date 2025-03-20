import { lazy } from 'react';
import { Route, Routes } from 'react-router-dom';
import ZoomIntegration from '../../pages/integration/ZoomIntegration';
import MailerMagixIntegration from '../../pages/integration/MailerMagixIntegration';
import PhonepeIntegration from '../../pages/integration/PhonepeIntegration';

const Apps = lazy(() => import('../../pages/integration/Apps'));
const IntegrationHub = lazy(() => import('../../pages/integration/IntegrationHub'));
const RazorpayIntegration = lazy(() => import('../../pages/integration/RazorpayIntegration'));
const StripeIntegration = lazy(() => import('../../pages/integration/StripeIntegration'));
const PaypalIntegration = lazy(() => import('../../pages/integration/PaypalIntegration'));
const ZohocrmIntegration = lazy(() => import('../../pages/integration/ZohocrmIntegration'));
const WhatsAppIntegration = lazy(() => import('../../pages/integration/WhatsAppIntegration'));
const SMSIntegration = lazy(() => import('../../pages/integration/SMSIntegration'));
const PageNotFound = lazy(() => import('../../pages/common/PageNotFound'));

const IntegrationRoutes = () => {
  return (
    <Routes>
      <Route path="/app" element={<Apps />} />
      <Route path="/integration/:id" element={<IntegrationHub />} />
      <Route path="/integration/razorpay" element={<RazorpayIntegration />} />
      <Route path="/integration/stripe" element={<StripeIntegration />} />
      <Route path="/integration/paypal" element={<PaypalIntegration />} />
      <Route path="/integration/zohocrm" element={<ZohocrmIntegration />} />
      <Route path="/integration/whatsapp" element={<WhatsAppIntegration />} />
      <Route path="/integration/sms" element={<SMSIntegration />} />
      <Route path="/integration/zoom" element={<ZoomIntegration />} />
      <Route path="/integration/mailerMagix" element={<MailerMagixIntegration />} />
      <Route path="/integration/phonepe" element={<PhonepeIntegration />} />

      <Route path="*" element={<PageNotFound />} />
    </Routes>
  );
};

export default IntegrationRoutes;
