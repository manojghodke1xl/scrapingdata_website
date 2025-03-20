import { lazy } from 'react';

// Lazy load the VendorList component
const VendorList = lazy(() => import('../../../pages/leads/vendor/VendorList'));
// Lazy load the AddVendor component
const AddVendor = lazy(() => import('../../../pages/leads/vendor/AddVendor'));
// Lazy load the ViewVendor component
const ViewVendor = lazy(() => import('../../../pages/leads/vendor/ViewVendor'));
// Lazy load the VendorIntegration component
const VendorIntegration = lazy(() => import('../../../pages/leads/vendor/VendorIntegration'));

// Define routes for vendor-related pages
const VendorRoutes = [
  // Route for listing vendors
  { path: 'vendor/vendor-list', Component: VendorList },
  // Route for adding a new vendor
  { path: 'vendor/add-vendor', Component: AddVendor },
  // Route for viewing a specific vendor by ID
  { path: 'vendor/view-vendor/:id', Component: ViewVendor },
  // Route for vendor integrations
  { path: 'vendor/vendor-integration', Component: VendorIntegration }
];

// Export the VendorRoutes array as the default export
export default VendorRoutes;
