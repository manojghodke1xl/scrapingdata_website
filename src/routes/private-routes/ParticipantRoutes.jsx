import { lazy } from 'react';

// Lazy load the ParticipantList component
const ParticipantList = lazy(() => import('../../pages/participant/ParticipantList'));
// Lazy load the AddParticipant component
const AddParticipant = lazy(() => import('../../pages/participant/AddParticipant'));
// Lazy load the ParticipantBulkImport component
const ParticipantBulkImport = lazy(() => import('../../pages/participant/ParticipantBulkImport'));

// Define the routes for participant-related pages
const ParticipantRoutes = [
  // Route for listing participants
  { path: 'participants/participant-list', Component: ParticipantList },
  // Route for adding a new participant
  { path: 'participants/add-participant', Component: AddParticipant },
  // Route for importing participants in bulk
  { path: 'participants/import-participants', Component: ParticipantBulkImport }
];

// Export the ParticipantRoutes array as the default export
export default ParticipantRoutes;
