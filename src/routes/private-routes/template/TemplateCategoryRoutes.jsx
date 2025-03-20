import { lazy } from 'react';

// Lazy load the AddTemplateCategory component
const AddTemplateCategory = lazy(() => import('../../../pages/templates/templateCategory/AddTemplateCategory'));
// Lazy load the TemplateCategoryList component
const TemplateCategoryList = lazy(() => import('../../../pages/templates/templateCategory/TemplateCategoryList'));

// Define the routes for template categories
const TemplateCategoryRoutes = [
  // Route for listing template categories
  { path: 'template-category/template-category-list', Component: TemplateCategoryList },
  // Route for adding a new template category
  { path: 'template-category/add-template-category', Component: AddTemplateCategory },
  // Route for editing an existing template category by ID
  { path: 'template-category/edit-template-category/:id', Component: AddTemplateCategory }
];

// Export the TemplateCategoryRoutes array as the default export
export default TemplateCategoryRoutes;
