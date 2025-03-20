import { lazy } from 'react';

// Lazy load the AddGuides component, which is used to create a new guide
const AddGuides = lazy(() => import('../../pages/guides/AddGuides'));
// Lazy load the GuidesList component, which is used to display a list of guides
const GuidesList = lazy(() => import('../../pages/guides/GuidesList'));
// Lazy load the GuidesIntegration component, which is used to integrate guides with other systems
const GuildesIntegration = lazy(() => import('../../pages/guides/GuidesIntegration'));

// Define the routes for the guides feature
const GuidesRoutes = [
  // Route for listing guides
  { path: 'guides/guides-list', Component: GuidesList },
  // Route for adding a new guide
  { path: 'guides/add-guide', Component: AddGuides },
  // Route for editing an existing guide
  { path: 'guides/edit-guide/:id', Component: AddGuides },
  // Route for integrating guides with other systems
  { path: 'guides/guides-integration', Component: GuildesIntegration },
  // Route for duplicating an existing guide
  { path: 'guides/duplicate-guide/:id', Component: AddGuides }
];

// Export the GuidesRoutes array as the default export
export default GuidesRoutes;

