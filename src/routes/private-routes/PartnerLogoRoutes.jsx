import { lazy } from 'react';
import { Route, Routes } from 'react-router-dom';

const PartnerLogoList = lazy(() => import('../../pages/partnerLogo/PartnerLogoList'));
const AddPartnerLogo = lazy(() => import('../../pages/partnerLogo/AddPartnerLogo'));
const PageNotFound = lazy(() => import('../../pages/common/PageNotFound'));

const PartnerLoogoRoutes = () => {
  return (
    <Routes>
      <Route path="/partner-logo-list" element={<PartnerLogoList />} />
      <Route path="/add-partner-logo" element={<AddPartnerLogo />} />
      <Route path="/edit-partner-logo/:id" element={<AddPartnerLogo />} />
      <Route path="*" element={<PageNotFound />} />
    </Routes>
  );
};

export default PartnerLoogoRoutes;
