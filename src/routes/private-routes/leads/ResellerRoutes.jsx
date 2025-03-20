import { lazy } from 'react';

// Lazy load the ResellerList component
const ResellerList = lazy(() => import('../../../pages/leads/reseller/ResellerList'));
// Lazy load the AddReseller component
const AddReseller = lazy(() => import('../../../pages/leads/reseller/AddReseller'));
// Lazy load the ViewReseller component
const ViewReseller = lazy(() => import('../../../pages/leads/reseller/ViewReseller'));
// Lazy load the ResellerIntegration component
const ResellerIntegration = lazy(() => import('../../../pages/leads/reseller/ResellerIntegration'));

// Define routes for reseller-related pages
const ResellerRoutes = [
  // Route for listing resellers
  { path: 'reseller/reseller-list', Component: ResellerList },
  // Route for adding a new reseller
  { path: 'reseller/add-reseller', Component: AddReseller },
  // Route for viewing a specific reseller by ID
  { path: 'reseller/view-reseller/:id', Component: ViewReseller },
  // Route for reseller integrations
  { path: 'reseller/reseller-integration', Component: ResellerIntegration }
];

// Export the ResellerRoutes array as the default export
export default ResellerRoutes;
