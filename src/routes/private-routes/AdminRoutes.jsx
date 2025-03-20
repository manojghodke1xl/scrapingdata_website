import { lazy } from 'react';

// Lazy load the AddAdmin component
const AddAdmin = lazy(() => import('../../pages/admin/AddAdmin'));
// Lazy load the AdminList component
const AdminList = lazy(() => import('../../pages/admin/AdminList'));
// Lazy load the AdminSettings component
const AdminSettings = lazy(() => import('../../pages/admin/AdminSettings'));

// AdminRoutes array defines the routes for the admin feature.
const AdminRoutes = [
  // Route for listing admins
  { path: 'admin/admin-list', Component: AdminList },
  // Route for adding a new admin
  { path: 'admin/add-admin', Component: AddAdmin },
  // Route for editing an existing admin by ID
  { path: 'admin/edit-admin/:id', Component: AddAdmin },
  // Route for admin settings
  { path: 'admin/admin-settings', Component: AdminSettings }
];

// Export the AdminRoutes array as the default export
export default AdminRoutes;
