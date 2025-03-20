import { lazy } from 'react';

// Lazy load the TestimonialList component to display a list of testimonials
const TestimonialList = lazy(() => import('../../pages/testimonials/TestimonialList'));
// Lazy load the AddTestimonial component for adding or editing a testimonial
const AddTestimonial = lazy(() => import('../../pages/testimonials/AddTestimonial'));

// Define the routes for testimonials-related pages
const TestimonialRoutes = [
  // Route to display the list of testimonials
  { path: 'testimonials/testimonial-list', Component: TestimonialList },
  // Route to add a new testimonial
  { path: 'testimonials/add-testimonial', Component: AddTestimonial },
  // Route to edit an existing testimonial by ID
  { path: 'testimonials/edit-testimonial/:id', Component: AddTestimonial },
  // Route to duplicate an existing testimonial by ID
  { path: 'testimonials/duplicate-testimonial/:id', Component: AddTestimonial }
];

// Export the TestimonialRoutes array as the default export
export default TestimonialRoutes;
