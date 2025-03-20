import { lazy } from 'react';

// Lazy load the AddSmtp component
const AddSmtp = lazy(() => import('../../pages/smtp/AddSmtp'));
// Lazy load the SmtpList component
const SmtpList = lazy(() => import('../../pages/smtp/SmtpList'));

// Define the routes for SMTP-related pages
const SmtpRoutes = [
  // Route for listing SMTPs
  { path: 'smtp/smtp-list', Component: SmtpList },
  // Route for adding a new SMTP
  { path: 'smtp/add-smtp', Component: AddSmtp },
  // Route for editing an existing SMTP by ID
  { path: 'smtp/edit-smtp/:id', Component: AddSmtp },
  // Route for duplicating an existing SMTP by ID
  { path: 'smtp/duplicate-smtp/:id', Component: AddSmtp }
];

// Export the SmtpRoutes array as the default export
export default SmtpRoutes;
