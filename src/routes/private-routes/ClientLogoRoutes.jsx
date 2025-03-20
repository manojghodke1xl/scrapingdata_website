import { lazy } from 'react';

// Lazy load the ClientLogoList  components
const ClientLogoList = lazy(() => import('../../pages/clientLogo/ClientLogoList'));
// Lazy load the AddClientLogo component
const AddClientLogo = lazy(() => import('../../pages/clientLogo/AddClientLogo'));

// Define the routes
const ClientLogoRoutes = [
  // Route for listing client logos
  { path: 'client-logo/client-logo-list', Component: ClientLogoList },
  // Route for adding a new client logo
  { path: 'client-logo/add-client-logo', Component: AddClientLogo },
  // Route for editing a client logo
  { path: 'client-logo/edit-client-logo/:id', Component: AddClientLogo },
  // Route for duplicating a client logo
  { path: 'client-logo/duplicate-client-logo/:id', Component: AddClientLogo }
];

// Export the ClientLogoRoutes array as the default export
export default ClientLogoRoutes;
