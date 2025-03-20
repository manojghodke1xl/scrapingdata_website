import { lazy } from 'react';

// Lazy load the AddTestimonialCategory component to add or edit a testimonial category
const AddTestimonialCategory = lazy(() => import('../../pages/testimonialCategory/AddTestimonialCategory'));
// Lazy load the TestimonialCategoryList component to display a list of testimonial categories
const TestimonialCategoryList = lazy(() => import('../../pages/testimonialCategory/TestimonialCategoryList'));

// Define routes for testimonial category-related pages
const TestimonialCategoryRoutes = [
  // Route to display a list of testimonial categories
  { path: 'testimonial-category/testimonial-category-list', Component: TestimonialCategoryList },
  // Route to add a new testimonial category
  { path: 'testimonial-category/add-testimonial-category', Component: AddTestimonialCategory },
  // Route to edit an existing testimonial category by ID
  { path: 'testimonial-category/edit-testimonial-category/:id', Component: AddTestimonialCategory }
];

// Export the TestimonialCategoryRoutes array as the default export
export default TestimonialCategoryRoutes;
