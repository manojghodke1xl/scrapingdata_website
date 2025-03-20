import { lazy } from 'react';

// Lazy load integration components
const Apps = lazy(() => import('../../pages/integration/Apps'));
const IntegrationHub = lazy(() => import('../../pages/integration/IntegrationHub'));
const RazorpayIntegration = lazy(() => import('../../pages/integration/RazorpayIntegration'));
const StripeIntegration = lazy(() => import('../../pages/integration/StripeIntegration'));
const PaypalIntegration = lazy(() => import('../../pages/integration/PaypalIntegration'));
const ZohocrmIntegration = lazy(() => import('../../pages/integration/ZohocrmIntegration'));
const WhatsAppIntegration = lazy(() => import('../../pages/integration/WhatsAppIntegration'));
const SMSIntegration = lazy(() => import('../../pages/integration/SMSIntegration'));
const ZoomIntegration = lazy(() => import('../../pages/integration/ZoomIntegration'));
const MailerMagixIntegration = lazy(() => import('../../pages/integration/MailerMagixIntegration'));

// Define integration routes
const IntegrationRoutes = [
  // Route for the list of apps
  { path: 'apps/app', Component: Apps },
  // Route for the integration hub
  { path: 'apps/integration/:id', Component: IntegrationHub },
  // Routes for specific integrations
  { path: 'apps/integration/razorpay', Component: RazorpayIntegration },
  { path: 'apps/integration/stripe', Component: StripeIntegration },
  { path: 'apps/integration/paypal', Component: PaypalIntegration },
  { path: 'apps/integration/zohocrm', Component: ZohocrmIntegration },
  { path: 'apps/integration/whatsapp', Component: WhatsAppIntegration },
  { path: 'apps/integration/sms', Component: SMSIntegration },
  { path: 'apps/integration/zoom', Component: ZoomIntegration },
  { path: 'apps/integration/mailerMagix', Component: MailerMagixIntegration }
];

// Export integration routes
export default IntegrationRoutes;

