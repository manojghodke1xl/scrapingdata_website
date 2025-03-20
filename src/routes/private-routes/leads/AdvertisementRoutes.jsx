import { lazy } from 'react';

// Lazy load the AdvertisementList component
const AdvertisementList = lazy(() => import('../../../pages/leads/advertisement/AdvertisementList'));
// Lazy load the AddAdvertisement component
const AddAdvertisement = lazy(() => import('../../../pages/leads/advertisement/AddAdvertisement'));
// Lazy load the ViewAdvertisement component
const ViewAdvertisement = lazy(() => import('../../../pages/leads/advertisement/ViewAdvertisement'));
// Lazy load the AdvertisementIntegration component
const AdvertisementIntegration = lazy(() => import('../../../pages/leads/advertisement/AdvertisementIntegration'));

// Define routes for advertisement-related pages
const AdvertisementRoutes = [
  // Route for listing advertisements
  { path: 'advertisement/advertisement-list', Component: AdvertisementList },
  // Route for adding a new advertisement
  { path: 'advertisement/add-advertisement', Component: AddAdvertisement },
  // Route for viewing a specific advertisement by ID
  { path: 'advertisement/view-advertisement/:id', Component: ViewAdvertisement },
  // Route for advertisement integrations
  { path: 'advertisement/advertisement-integration', Component: AdvertisementIntegration }
];

// Export the AdvertisementRoutes array as the default export
export default AdvertisementRoutes;
