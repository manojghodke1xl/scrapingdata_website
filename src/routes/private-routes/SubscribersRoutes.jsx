import { lazy } from 'react';

// Lazy load the ViewSubscriber component for viewing a specific subscriber
const ViewSubscriber = lazy(() => import('../../pages/subscriber/ViewSubscriber'));
// Lazy load the AddSubscriber component for adding a new subscriber
const AddSubscriber = lazy(() => import('../../pages/subscriber/AddSubscriber'));
// Lazy load the SubscribersList component for listing all subscribers
const SubscribersList = lazy(() => import('../../pages/subscriber/SubscribersList'));
// Lazy load the SubscriberIntegration component for integration-related functionalities
const SubscriberIntegration = lazy(() => import('../../pages/subscriber/SubscriberIntegration'));

// Define routes for subscriber-related pages
const SubscribersRoutes = [
  // Route for listing subscribers
  { path: 'subscriber/subscriber-list', Component: SubscribersList },
  // Route for adding a new subscriber
  { path: 'subscriber/add-subscriber', Component: AddSubscriber },
  // Route for viewing a specific subscriber by ID
  { path: 'subscriber/view-subscriber/:id', Component: ViewSubscriber },
  // Route for subscriber integrations
  { path: 'subscriber/subscriber-integration', Component: SubscriberIntegration }
];

// Export the SubscribersRoutes array as the default export
export default SubscribersRoutes;
