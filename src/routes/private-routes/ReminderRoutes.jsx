import { lazy } from 'react';

// Lazy load the ReminderList component
const ReminderList = lazy(() => import('../../pages/reminder/ReminderList'));
// Lazy load the AddReminder component
const AddReminder = lazy(() => import('../../pages/reminder/AddReminder'));

// Define the routes for the reminder feature
const ReminderRoutes = [
  // Route for listing reminders
  { path: 'reminder/reminder-list', Component: ReminderList },
  // Route for adding a new reminder
  { path: 'reminder/add-reminder', Component: AddReminder },
  // Route for editing an existing reminder
  { path: 'reminder/edit-reminder/:id', Component: AddReminder },
  // Route for duplicating an existing reminder
  { path: 'reminder/duplicate-reminder/:id', Component: AddReminder }
];

// Export the ReminderRoutes array as the default export
export default ReminderRoutes;
