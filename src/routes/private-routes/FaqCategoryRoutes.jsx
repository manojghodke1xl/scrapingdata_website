import { lazy } from 'react';

// Lazy load the FaqCategoryList component to display a list of FAQ categories.
const FaqCategoryList = lazy(() => import('../../pages/faqCategory/FaqCategoryList'));
// Lazy load the AddFaqCategory component to add a new FAQ category.
const AddFaqCategory = lazy(() => import('../../pages/faqCategory/AddFaqCategory'));

// Define the routes for the FAQ category feature.
const FaqCategoryRoutes = [
  // Route to display a list of FAQ categories.
  { path: 'faq-category/faq-category-list', Component: FaqCategoryList },
  // Route to add a new FAQ category.
  { path: 'faq-category/add-faq-category', Component: AddFaqCategory },
  // Route to edit an existing FAQ category.
  { path: 'faq-category/edit-faq-category/:id', Component: AddFaqCategory }
];

// Export the FaqCategoryRoutes array as the default export.
export default FaqCategoryRoutes;
