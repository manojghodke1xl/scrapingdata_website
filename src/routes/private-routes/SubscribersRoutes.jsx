import { lazy } from 'react';
import { Route, Routes } from 'react-router-dom';

const ViewSubscriber = lazy(() => import('../../pages/subscriber/ViewSubscriber'));
const SubscribersList = lazy(() => import('../../pages/subscriber/SubscribersList'));
const SubscriberIntegration = lazy(() => import('../../pages/subscriber/SubscriberIntegration'));
const PageNotFound = lazy(() => import('../../pages/common/PageNotFound'));

const SubscribersRoutes = () => {
  return (
    <Routes>
      <Route path="/subscriber-list" element={<SubscribersList />} />
      <Route path="/view-subscriber/:id" element={<ViewSubscriber />} />
      <Route path="/subscriber-integration" element={<SubscriberIntegration />} />
      <Route path="*" element={<PageNotFound />} />
    </Routes>
  );
};

export default SubscribersRoutes;
