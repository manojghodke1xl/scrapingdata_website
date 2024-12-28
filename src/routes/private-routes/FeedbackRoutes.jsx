import { lazy } from 'react';
import { Route, Routes } from 'react-router-dom';

const FeedbackList = lazy(() => import('../../pages/feedback/FeedbackList'));
const ViewFeedback = lazy(() => import('../../pages/feedback/ViewFeedback'));
const FeedbackIntegration = lazy(() => import('../../pages/feedback/FeedbackIntegration'));
const PageNotFound = lazy(() => import('../../pages/common/PageNotFound'));

const FeedbackRoutes = () => {
  return (
    <Routes>
      <Route path="/feedback-list" element={<FeedbackList />} />
      <Route path="/view-feedback/:id" element={<ViewFeedback />} />
      <Route path="/feedback-integration" element={<FeedbackIntegration />} />
      <Route path="*" element={<PageNotFound />} />
    </Routes>
  );
};

export default FeedbackRoutes;
