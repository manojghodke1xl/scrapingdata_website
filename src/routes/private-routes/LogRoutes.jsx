import { lazy } from 'react';

// Lazy load the WhatsAppLogList component
const WhatsAppLogList = lazy(() => import('../../pages/socialLogs/whatsappList'));
// Lazy load the EmailLogList component
const EmailLogList = lazy(() => import('../../pages/socialLogs/emailList'));
// Lazy load the WhatsappLogPreview component
const WhatsappLogPreview = lazy(() => import('../../pages/socialLogs/whatsappLogPreview'));
// Lazy load the EmailLogPreview component
const EmailLogPreview = lazy(() => import('../../pages/socialLogs/emailLogPreview'));

// Define routes for log-related pages
const LogRoutes = [
  // Route for listing WhatsApp logs
  { path: 'logs/whatsapp-log-list', Component: WhatsAppLogList },
  // Route for listing email logs
  { path: 'logs/email-log-list', Component: EmailLogList },
  // Route for previewing a specific WhatsApp log by ID
  { path: 'logs/whatsapp-log-preview/:id', Component: WhatsappLogPreview },
  // Route for previewing a specific email log by ID
  { path: 'logs/email-log-preview/:id', Component: EmailLogPreview }
];

// Export the LogRoutes array as the default export
export default LogRoutes;

