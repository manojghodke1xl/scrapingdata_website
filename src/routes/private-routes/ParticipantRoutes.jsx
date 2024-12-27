import { lazy } from 'react';
import { Route, Routes } from 'react-router-dom';

const ParticipantList = lazy(() => import('../../pages/participant/ParticipantList'));

const ParticipantRoutes = () => {
  return (
    <Routes>
      <Route path="/participant-list" element={<ParticipantList />} />
    </Routes>
  );
};

export default ParticipantRoutes;
