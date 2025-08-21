import { lazy } from 'react';

// Lazy load the AddAdmin component
const AddMetaData = lazy(() => import('../../pages/metaData/AddMetaData'));
// Lazy load the AdminList component
const MetaDataList = lazy(() => import('../../pages/metaData/MetaDataList'));
// Lazy load the ImportMetaData component
const ImportMetaData = lazy(() => import('../../pages/metaData/ImportMetaData'))

const ViewMetaData = lazy(() => import('../../pages/metaData/ViewMetaData'));
// AdminRoutes array defines the routes for the admin feature.
const MetaDataRoutes = [
  // Route for listing admins
  { path: 'metadata/add-metadata', Component: AddMetaData },
  // Route for adding a new admin
  { path: 'metadata/metadata-list', Component: MetaDataList },
  //Route for viewing  meta data
  { path: 'metadata/view-metadata/:id', Component: ViewMetaData },

  { path: 'metadata/edit-metadata/:id', Component: AddMetaData },

  // Route for importing meta data
  { path: 'metadata/import-metadata', Component: ImportMetaData }


  // Route for editing an existing admin by ID
  //   { path: 'metaData/edit-admin/:id', Component: AddAdmin },
];

// Export the AdminRoutes array as the default export
export default MetaDataRoutes;
