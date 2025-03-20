import { lazy } from 'react';

// Lazy load the FilesList component
const FilesList = lazy(() => import('../../pages/files/FilesList'));
// Lazy load the AddFiles component
const AddFiles = lazy(() => import('../../pages/files/AddFiles'));

// Define the routes for the files feature
const FilesRoutes = [
  // Route to display the list of files
  { path: 'files/file-list', Component: FilesList },
  // Route to add a new file
  { path: 'files/add-file', Component: AddFiles },
  // Route to edit an existing file
  { path: 'files/edit-file/:id', Component: AddFiles }
];

// Export the FilesRoutes array as the default export
export default FilesRoutes;
