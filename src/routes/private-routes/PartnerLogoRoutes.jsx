import { lazy } from 'react';

// Lazy load the PartnerLogoList component
const PartnerLogoList = lazy(() => import('../../pages/partnerLogo/PartnerLogoList'));
// Lazy load the AddPartnerLogo component
const AddPartnerLogo = lazy(() => import('../../pages/partnerLogo/AddPartnerLogo'));

// Define the routes for the PartnerLogo module
const PartnerLogoRoutes = [
  // Route for listing partner logos
  { path: 'partner-logo/partner-logo-list', Component: PartnerLogoList },
  // Route for adding a new partner logo
  { path: 'partner-logo/add-partner-logo', Component: AddPartnerLogo },
  // Route for editing an existing partner logo
  { path: 'partner-logo/edit-partner-logo/:id', Component: AddPartnerLogo },
  // Route for duplicating an existing partner logo
  { path: 'partner-logo/duplicate-partner-logo/:id', Component: AddPartnerLogo }
];

// Export the PartnerLogoRoutes array as the default export
export default PartnerLogoRoutes;
