import { lazy } from 'react';

// Lazy load AddAffiliate component to add a new affiliate.
const AddAffiliate = lazy(() => import('../../../pages/leads/affiliate/AddAffiliate'));
// Lazy load AffiliateList component to display a list of affiliates.
const AffiliateList = lazy(() => import('../../../pages/leads/affiliate/AffiliateList'));
// Lazy load ViewAffiliate component to view the details of an affiliate.
const ViewAffiliate = lazy(() => import('../../../pages/leads/affiliate/ViewAffiliate'));
// Lazy load AffiliateIntegration component to integrate the affiliate feature with other features.
const AffiliateIntegration = lazy(() => import('../../../pages/leads/affiliate/AffiliateIntegration'));

// Define the routes for the affiliate feature.
const AffiliateRoutes = [
  // Route to display the list of affiliates.
  { path: 'affiliate/affiliate-list', Component: AffiliateList },
  // Route to add a new affiliate.
  { path: 'affiliate/add-affiliate', Component: AddAffiliate },
  // Route to view the details of a specific affiliate.
  { path: 'affiliate/view-affiliate/:id', Component: ViewAffiliate },
  // Route to integrate the affiliate feature with other features.
  { path: 'affiliate/affiliate-integration', Component: AffiliateIntegration }
];

// Export the AffiliateRoutes array as the default export.
export default AffiliateRoutes;
