import { lazy } from 'react';

// Lazy load the FeedbackList component to display a list of feedback.
const FeedbackList = lazy(() => import('../../pages/feedback/FeedbackList'));
// Lazy load the AddFeedback component to add a new feedback.
const AddFeedback = lazy(() => import('../../pages/feedback/AddFeedback'));
// Lazy load the ViewFeedback component to view the details of a specific feedback.
const ViewFeedback = lazy(() => import('../../pages/feedback/ViewFeedback'));
// Lazy load the FeedbackIntegration component to integrate the feedback feature with other features.
const FeedbackIntegration = lazy(() => import('../../pages/feedback/FeedbackIntegration'));

// Define the routes for the feedback feature.
const FeedbackRoutes = [
  // Route to display a list of feedback.
  { path: 'feedback/feedback-list', Component: FeedbackList },
  // Route to add a new feedback.
  { path: 'feedback/add-feedback', Component: AddFeedback },
  // Route to view the details of a specific feedback by ID.
  { path: 'feedback/view-feedback/:id', Component: ViewFeedback },
  // Route to integrate the feedback feature with other features.
  { path: 'feedback/feedback-integration', Component: FeedbackIntegration }
];

// Export the FeedbackRoutes array as the default export.
export default FeedbackRoutes;
