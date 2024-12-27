import { lazy } from 'react';
import { Route, Routes } from 'react-router-dom';

const MailingList = lazy(() => import('../../pages/mailing/MailingList'));
const ViewMailing = lazy(() => import('../../pages/mailing/ViewMailing'));
const MailingListIntegration = lazy(() => import('../../pages/mailing/MailingIntegration'));

const MailingListRoutes = () => {
  return (
    <Routes>
      <Route path="/mailing-list" element={<MailingList />} />
      <Route path="/view-mailing/:id" element={<ViewMailing />} />
      <Route path="/mailing-integration" element={<MailingListIntegration />} />
    </Routes>
  );
};

export default MailingListRoutes;
