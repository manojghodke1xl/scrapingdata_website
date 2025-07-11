import { lazy } from 'react';

// Lazy load the AddAdmin component
const AddMetaData = lazy(() => import('../../pages/metaData/AddMetaData'));
// Lazy load the AdminList component
const MetaDataList = lazy(() => import('../../pages/metaData/MetaDataList'));

// AdminRoutes array defines the routes for the admin feature.
const MetaDataRoutes = [
  // Route for listing admins
  { path: 'metadata/add-metadata', Component: AddMetaData },
  // Route for adding a new admin
  { path: 'metadata/metadata-list', Component: MetaDataList },

  { path: 'metadata/edit-metadata/:id', Component: AddMetaData }
  // Route for editing an existing admin by ID
  //   { path: 'metaData/edit-admin/:id', Component: AddAdmin },
];

// Export the AdminRoutes array as the default export
export default MetaDataRoutes;
