import { lazy } from 'react';

// Lazy load FanClubList component to display a list of fan clubs.
const FanClubList = lazy(() => import('../../../pages/leads/fanClub/FanClubList'));
// Lazy load AddFanClub component to add a new fan club.
const AddFanClub = lazy(() => import('../../../pages/leads/fanClub/AddFanClub'));
// Lazy load ViewFanClub component to view the details of a fan club.
const ViewFanClub = lazy(() => import('../../../pages/leads/fanClub/ViewFanClub'));
// Lazy load FanClubIntegration component to integrate the fan club feature with other features.
const FanClubIntegration = lazy(() => import('../../../pages/leads/fanClub/FanClubIntegration'));

// Define the routes for the fan club feature.
const FanClubRoutes = [
  // Route to display the list of fan clubs.
  { path: 'fan-club/fan-club-list', Component: FanClubList },
  // Route to add a new fan club.
  { path: 'fan-club/add-fan-club', Component: AddFanClub },
  // Route to view the details of a specific fan club.
  { path: 'fan-club/view-fan-club/:id', Component: ViewFanClub },
  // Route to integrate the fan club feature with other features.
  { path: 'fan-club/fan-club-integration', Component: FanClubIntegration }
];

// Export the FanClubRoutes array as the default export.
export default FanClubRoutes;
