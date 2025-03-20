import { lazy } from 'react';

// Lazy load the components
const PackageList = lazy(() => import('../../pages/package/PackageList'));
const AddPackage = lazy(() => import('../../pages/package/AddPackage'));

// Define the routes for the packages
const PackageRoutes = [
  // Route to display the list of packages
  { path: 'packages/package-list', Component: PackageList },
  // Route to add a new package
  { path: 'packages/add-package', Component: AddPackage },
  // Route to edit an existing package
  { path: 'packages/edit-package/:id', Component: AddPackage },
  // Route to duplicate an existing package
  { path: 'packages/duplicate-package/:id', Component: AddPackage }
];

// Export the PackageRoutes array as the default export
export default PackageRoutes;
