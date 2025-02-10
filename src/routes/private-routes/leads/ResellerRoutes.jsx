import { lazy } from 'react';
import { Route, Routes } from 'react-router-dom';

const ResellerList = lazy(() => import('../../../pages/leads/reseller/ResellerList'));
const AddReseller = lazy(() => import('../../../pages/leads/reseller/AddReseller'));
const ViewReseller = lazy(() => import('../../../pages/leads/reseller/ViewReseller'));
const ResellerIntegration = lazy(() => import('../../../pages/leads/reseller/ResellerIntegration'));
const PageNotFound = lazy(() => import('../../../pages/common/PageNotFound'));

const ResellerRoutes = () => {
  return (
    <Routes>
      <Route path="/reseller-list" element={<ResellerList />} />
      <Route path="/add-reseller" element={<AddReseller />} />
      <Route path="/view-reseller/:id" element={<ViewReseller />} />
      <Route path="reseller-integration" element={<ResellerIntegration />} />
      <Route path="*" element={<PageNotFound />} />
    </Routes>
  );
};
export default ResellerRoutes;
