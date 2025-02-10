import { lazy } from 'react';
import { Route, Routes } from 'react-router-dom';

const FanClubList = lazy(() => import('../../../pages/leads/fanClub/FanClubList'));
const AddFanClub = lazy(() => import('../../../pages/leads/fanClub/AddFanClub'));
const ViewFanClub = lazy(() => import('../../../pages/leads/fanClub/ViewFanClub'));
const FanClubIntegration = lazy(() => import('../../../pages/leads/fanClub/FanClubIntegration'));
const PageNotFound = lazy(() => import('../../../pages/common/PageNotFound'));

const FanClubRoutes = () => {
  return (
    <Routes>
      <Route path="/fan-club-list" element={<FanClubList />} />
      <Route path="/add-fan-club" element={<AddFanClub />} />
      <Route path="/view-fan-club/:id" element={<ViewFanClub />} />
      <Route path="/fan-club-integration" element={<FanClubIntegration />} />
      <Route path="*" element={<PageNotFound />} />
    </Routes>
  );
};

export default FanClubRoutes;
