import { lazy } from 'react';

// Lazy load the BroadcastList component, which displays a list of all broadcasts
const BroadcastList = lazy(() => import('../../pages/broadcast/BroadcastList'));
// Lazy load the AddBroadcast component, which is used to add a new broadcast or edit an existing one
const AddBroadcast = lazy(() => import('../../pages/broadcast/AddBroadcast'));

// Define the routes for the broadcasts feature
const BroadcastRoutes = [
  // Route for listing all broadcasts
  { path: 'broadcast/broadcast-list', Component: BroadcastList },
  // Route for adding a new broadcast
  { path: 'broadcast/add-broadcast', Component: AddBroadcast },
  // Route for editing an existing broadcast
  { path: 'broadcast/edit-broadcast/:id', Component: AddBroadcast },
  // Route for duplicating an existing broadcast
  { path: 'broadcast/duplicate-broadcast/:id', Component: AddBroadcast }
];

// Export the BroadcastRoutes array as the default export
export default BroadcastRoutes;

