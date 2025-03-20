import { lazy } from 'react';

// Lazy load the EventList component
const EventList = lazy(() => import('../../pages/event/EventList'));
// Lazy load the AddEvent component
const AddEvent = lazy(() => import('../../pages/event/AddEvent'));
// Lazy load the EventDetails component
const EventDetails = lazy(() => import('../../pages/event/EventDetails'));

// Define routes for event-related pages
const EventRoutes = [
  // Route for listing events
  { path: 'events/event-list', Component: EventList },
  // Route for adding a new event
  { path: 'events/add-event', Component: AddEvent },
  // Route for editing a specific event by ID
  { path: 'events/edit-event/:id', Component: AddEvent },
  // Route for viewing a specific event by ID
  { path: 'events/view-event/:id', Component: EventDetails },
  // Route for duplicating a specific event by ID
  { path: 'events/duplicate-event/:id', Component: AddEvent }
];

// Export the EventRoutes array as the default export
export default EventRoutes;

