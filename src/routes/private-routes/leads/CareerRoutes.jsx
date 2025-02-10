import { lazy } from 'react';
import { Route, Routes } from 'react-router-dom';

const CareerList = lazy(() => import('../../../pages/leads/career/CareerList'));
const AddCareer = lazy(() => import('../../../pages/leads/career/AddCareer'));
const ViewCareer = lazy(() => import('../../../pages/leads/career/ViewCareer'));
const CareerIntegration = lazy(() => import('../../../pages/leads/career/CareerIntegration'));
const PageNotFound = lazy(() => import('../../../pages/common/PageNotFound'));

const CareerRoutes = () => {
  return (
    <Routes>
      <Route path="/career-list" element={<CareerList />} />
      <Route path="/add-career" element={<AddCareer />} />
      <Route path="/view-career/:id" element={<ViewCareer />} />
      <Route path="/career-integration" element={<CareerIntegration />} />
      <Route path="*" element={<PageNotFound />} />
    </Routes>
  );
};

export default CareerRoutes;
