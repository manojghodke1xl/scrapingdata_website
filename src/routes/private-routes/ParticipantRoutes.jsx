import { lazy } from 'react';
import { Route, Routes } from 'react-router-dom';

const ParticipantList = lazy(() => import('../../pages/participant/ParticipantList'));
const PageNotFound = lazy(() => import('../../pages/common/PageNotFound'));

const ParticipantRoutes = () => {
  return (
    <Routes>
      <Route path="/participant-list" element={<ParticipantList />} />
      <Route path="*" element={<PageNotFound />} />
    </Routes>
  );
};

export default ParticipantRoutes;
