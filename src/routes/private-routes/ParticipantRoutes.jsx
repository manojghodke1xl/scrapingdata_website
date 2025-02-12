import { lazy } from 'react';
import { Route, Routes } from 'react-router-dom';

const ParticipantList = lazy(() => import('../../pages/participant/ParticipantList'));
const AddParticipant = lazy(() => import('../../pages/participant/AddParticipant'));
const PageNotFound = lazy(() => import('../../pages/common/PageNotFound'));

const ParticipantRoutes = () => {
  return (
    <Routes>
      <Route path="/participant-list" element={<ParticipantList />} />
      <Route path="/add-participant" element={<AddParticipant />} />
      <Route path="*" element={<PageNotFound />} />
    </Routes>
  );
};

export default ParticipantRoutes;
