import { lazy } from 'react';

// Lazy load the CareerList component
const CareerList = lazy(() => import('../../../pages/leads/career/CareerList'));
// Lazy load the AddCareer component
const AddCareer = lazy(() => import('../../../pages/leads/career/AddCareer'));
// Lazy load the ViewCareer component
const ViewCareer = lazy(() => import('../../../pages/leads/career/ViewCareer'));
// Lazy load the CareerIntegration component
const CareerIntegration = lazy(() => import('../../../pages/leads/career/CareerIntegration'));

/**
 * Career routes array
 */
const CareerRoutes = [
  // Route for listing careers
  { path: 'career/career-list', Component: CareerList },
  // Route for adding a new career
  { path: 'career/add-career', Component: AddCareer },
  // Route for viewing a specific career by ID
  { path: 'career/view-career/:id', Component: ViewCareer },
  // Route for career integrations
  { path: 'career/career-integration', Component: CareerIntegration }
];

// Export the CareerRoutes array as the default export
export default CareerRoutes;
