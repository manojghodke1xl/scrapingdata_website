import { lazy } from 'react';
import { Route, Routes } from 'react-router-dom';

const DistributorList = lazy(() => import('../../../pages/leads/distributor/DistributorList'));
const ViewDistributor = lazy(() => import('../../../pages/leads/distributor/ViewDistributor'));
const AddDistributor = lazy(() => import('../../../pages/leads/distributor/AddDistributor'));
const DistributorIntegration = lazy(() => import('../../../pages/leads/distributor/DistributorIntegration'));
const PageNotFound = lazy(() => import('../../../pages/common/PageNotFound'));

const DistributorRoutes = () => {
  return (
    <Routes>
      <Route path="/distributor-list" element={<DistributorList />} />
      <Route path="/add-distributor" element={<AddDistributor />} />
      {/* <Route path="/edit-distributor/:id" element={<AddDistributor />} /> */}
      <Route path="/view-distributor/:id" element={<ViewDistributor />} />
      <Route path="/distributor-integration" element={<DistributorIntegration />} />
      <Route path="*" element={<PageNotFound />} />
    </Routes>
  );
};

export default DistributorRoutes;
