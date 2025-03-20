import { lazy } from 'react';

// Lazy load the RecaptchaList component to display a list of recaptcha.
const RecaptchaList = lazy(() => import('../../pages/recaptcha/RecaptchaList'));
// Lazy load the AddRecaptcha component to add a new recaptcha.
const AddRecaptcha = lazy(() => import('../../pages/recaptcha/AddRecaptcha'));

// Define the routes for the recaptcha feature.
const RecaptchaRoutes = [
  // Route to display a list of recaptcha.
  { path: 'recaptcha/recaptcha-list', Component: RecaptchaList },
  // Route to add a new recaptcha.
  { path: 'recaptcha/add-recaptcha', Component: AddRecaptcha },
  // Route to edit a specific recaptcha by ID.
  { path: 'recaptcha/edit-recaptcha/:id', Component: AddRecaptcha },
  // Route to duplicate a specific recaptcha by ID.
  { path: 'recaptcha/duplicate-recaptcha/:id', Component: AddRecaptcha }
];

// Export the RecaptchaRoutes array as the default export.
export default RecaptchaRoutes;
