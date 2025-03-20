import { lazy } from 'react';

// Lazy load the AddContact component
const AddContact = lazy(() => import('../../pages/contact/AddContact'));
// Lazy load the ContactList component
const ContactList = lazy(() => import('../../pages/contact/ContactList'));
// Lazy load the ContactBulkImport component
const ContactBulkImport = lazy(() => import('../../pages/contact/ContactBulkImport'));

// Define routes for contact-related pages
const ContactRoutes = [
  // Route for listing contacts
  { path: 'contact/contact-list', Component: ContactList },
  // Route for adding a new contact
  { path: 'contact/add-contact', Component: AddContact },
  // Route for editing a specific contact by ID
  { path: 'contact/edit-contact/:id', Component: AddContact },
  // Route for importing contacts
  { path: 'contact/import-contacts', Component: ContactBulkImport }
];

// Export the ContactRoutes array as the default export
export default ContactRoutes;
