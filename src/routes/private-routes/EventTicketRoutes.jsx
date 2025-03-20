import { lazy } from 'react';

// Lazy load the EventTicketList component
const EventTicketList = lazy(() => import('../../pages/eventTicket/EventTicketList'));
// Lazy load the AddEventTicket component
const AddEventTicket = lazy(() => import('../../pages/eventTicket/AddEventTicket'));

// Define the routes for event tickets
const EventTicketRoutes = [
  // Route for listing all event tickets
  { path: 'tickets/ticket-list', Component: EventTicketList },
  // Route for adding a new event ticket
  { path: 'tickets/add-ticket', Component: AddEventTicket },
  // Route for editing an existing event ticket by ID
  { path: 'tickets/edit-ticket/:id', Component: AddEventTicket }
];

// Export the EventTicketRoutes array as the default export
export default EventTicketRoutes;
