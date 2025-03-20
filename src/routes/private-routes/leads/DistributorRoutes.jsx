import { lazy } from 'react';

// Lazy load the DistributorList component, which displays a list of distributors.
const DistributorList = lazy(() => import('../../../pages/leads/distributor/DistributorList'));
// Lazy load the ViewDistributor component, which displays the details of a specific distributor.
const ViewDistributor = lazy(() => import('../../../pages/leads/distributor/ViewDistributor'));
// Lazy load the AddDistributor component, which allows the user to add a new distributor.
const AddDistributor = lazy(() => import('../../../pages/leads/distributor/AddDistributor'));
// Lazy load the DistributorIntegration component, which displays the integrations related to distributors.
const DistributorIntegration = lazy(() => import('../../../pages/leads/distributor/DistributorIntegration'));

// Define routes for distributor-related pages.
const DistributorRoutes = [
  // Route for listing distributors
  { path: 'distributor/distributor-list', Component: DistributorList },
  // Route for adding a new distributors
  { path: 'distributor/add-distributor', Component: AddDistributor },
  // Route for viewing a specific distributor by ID
  { path: 'distributor/view-distributor/:id', Component: ViewDistributor },
  // Route for distributor integrations
  { path: 'distributor/distributor-integration', Component: DistributorIntegration }
];

// Export the DistributorRoutes array as the default export.
export default DistributorRoutes;
