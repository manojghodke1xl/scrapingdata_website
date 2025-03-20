import { lazy } from 'react';

// The component to render for the Notification Agent list
const NotifAgentList = lazy(() => import('../../pages/notifAgent/NotifAgentList'));
// The component to render for adding a new Notification Agent
const AddNotifAgent = lazy(() => import('../../pages/notifAgent/AddNotifAgent'));

// The routes for the Notification Agent feature
const NotifAgentRoutes = [
  // The route for the Notification Agent list
  { path: 'notification-agent/notification-agent-list', Component: NotifAgentList },
  // The route for adding a new Notification Agent
  { path: 'notification-agent/add-notification-agent', Component: AddNotifAgent },
  // The route for editing an existing Notification Agent
  { path: 'notification-agent/edit-notification-agent/:id', Component: AddNotifAgent },
  // The route for duplicating an existing Notification Agent
  { path: 'notification-agent/duplicate-notification-agent/:id', Component: AddNotifAgent }
];

// Export the routes for the Notification Agent feature
export default NotifAgentRoutes;
