import { lazy } from 'react';

// Lazy load the WebinarList component
const WebinarList = lazy(() => import('../../pages/webinar/WebinarList'));
// Lazy load the AddWebinar component
const AddWebinar = lazy(() => import('../../pages/webinar/AddWebinar'));
// Lazy load the WebinarLinkList component
const WebinarLinkList = lazy(() => import('../../pages/webinar/WebinarLinkList'));

// Define routes for the webinars feature
const WebinarRoutes = [
  // Route for listing webinars
  { path: 'webinar/webinar-list', Component: WebinarList },
  // Route for adding a new webinar
  { path: 'webinar/add-webinar', Component: AddWebinar },
  // Route for editing a specific webinar by ID
  { path: 'webinar/edit-webinar/:id', Component: AddWebinar },
  // Route for duplicating a specific webinar by ID
  { path: 'webinar/duplicate-webinar/:id', Component: AddWebinar },
  // Route for listing webinar links
  { path: 'webinar/webinar-link', Component: WebinarLinkList }
];

// Export the WebinarRoutes array as the default export
export default WebinarRoutes;
