import { lazy } from 'react';
import { Route, Routes } from 'react-router-dom';

const NotifAgentList = lazy(() => import('../../pages/notifAgent/NotifAgentList'));
const AddNotifAgent = lazy(() => import('../../pages/notifAgent/AddNotifAgent'));
const PageNotFound = lazy(() => import('../../pages/common/PageNotFound'));

const NotifAgentRoutes = () => {
  return (
    <Routes>
      <Route path="/notification-agent-list" element={<NotifAgentList />} />
      <Route path="/add-notification-agent" element={<AddNotifAgent />} />
      <Route path="/edit-notification-agent/:id" element={<AddNotifAgent />} />
      <Route path="/duplicate-notification-agent/:id" element={<AddNotifAgent />} />
      <Route path="*" element={<PageNotFound />} />
    </Routes>
  );
};

export default NotifAgentRoutes;
