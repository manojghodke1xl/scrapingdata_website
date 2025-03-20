import { lazy } from 'react';

// Lazy load the UTMBuilderList component to display a list of UTM builders
const UTMBuilderList = lazy(() => import('../../pages/utmBuilder/UTMBuilderList'));
// Lazy load the AddUTMBuilder component to add, edit, or duplicate a UTM builder
const AddUTMBuilder = lazy(() => import('../../pages/utmBuilder/AddUTMBuilder'));

// Define the routes for the UTM builder feature
const UTMBuilderRoutes = [
  // Route to display a list of UTM builders
  { path: 'utm-builder/utm-builder-list', Component: UTMBuilderList },
  // Route to add a new UTM builder
  { path: 'utm-builder/add-utm-builder', Component: AddUTMBuilder },
  // Route to edit an existing UTM builder by ID
  { path: 'utm-builder/edit-utm-builder/:id', Component: AddUTMBuilder },
  // Route to duplicate an existing UTM builder by ID
  { path: 'utm-builder/duplicate-utm-builder/:id', Component: AddUTMBuilder }
];

// Export the UTMBuilderRoutes array as the default export
export default UTMBuilderRoutes;
