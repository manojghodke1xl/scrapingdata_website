import { lazy } from 'react';

// Lazy load the FaqList component to display a list of FAQs
const FaqList = lazy(() => import('../../pages/faq/FaqList'));
// Lazy load the AddFaq component to add or edit an FAQ
const AddFaq = lazy(() => import('../../pages/faq/AddFaq'));

// Define the routes for the FAQ feature
const FaqRoutes = [
  // Route to display a list of FAQs
  { path: 'faq/faq-list', Component: FaqList },
  // Route to add a new FAQ
  { path: 'faq/add-faq', Component: AddFaq },
  // Route to edit an existing FAQ by ID
  { path: 'faq/edit-faq/:id', Component: AddFaq },
  // Route to duplicate an existing FAQ by ID
  { path: 'faq/duplicate-faq/:id', Component: AddFaq }
];

// Export the FaqRoutes array as the default export
export default FaqRoutes;

