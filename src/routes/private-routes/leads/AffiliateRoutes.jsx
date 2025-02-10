import { lazy } from 'react';
import { Route, Routes } from 'react-router-dom';

const AddAffiliate = lazy(() => import('../../../pages/leads/affiliate/AddAffiliate'));
const AffiliateList = lazy(() => import('../../../pages/leads/affiliate/AffiliateList'));
const ViewAffiliate = lazy(() => import('../../../pages/leads/affiliate/ViewAffiliate'));
const AffiliateIntegration = lazy(() => import('../../../pages/leads/affiliate/AffiliateIntegration'));

const PageNotFound = lazy(() => import('../../../pages/common/PageNotFound'));

const AffiliateRoutes = () => {
  return (
    <Routes>
      <Route path="/affiliate-list" element={<AffiliateList />} />
      <Route path="/add-affiliate" element={<AddAffiliate />} />
      <Route path="/view-affiliate/:id" element={<ViewAffiliate />} />
      <Route path="/affiliate-integration" element={<AffiliateIntegration />} />
      <Route path="*" element={<PageNotFound />} />
    </Routes>
  );
};

export default AffiliateRoutes;
