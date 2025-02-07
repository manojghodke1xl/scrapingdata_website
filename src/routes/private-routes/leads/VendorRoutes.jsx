import { lazy } from 'react';
import { Route, Routes } from 'react-router-dom';

const VendorList = lazy(() => import('../../../pages/leads/vendor/VendorList'));
const AddVendor = lazy(() => import('../../../pages/leads/vendor/AddVendor'));
const ViewVendor = lazy(() => import('../../../pages/leads/vendor/ViewVendor'));
const VendorIntegration = lazy(() => import('../../../pages/leads/vendor/VendorIntegration'));
const PageNotFound = lazy(() => import('../../../pages/common/PageNotFound'));

const VendorRoutes = () => {
  return (
    <Routes>
      <Route path="/vendor-list" element={<VendorList />} />
      <Route path="/add-vendor" element={<AddVendor />} />
      <Route path="/view-vendor/:id" element={<ViewVendor />} />
      <Route path="/vendor-integration" element={<VendorIntegration />} />
      <Route path="*" element={<PageNotFound />} />
    </Routes>
  );
};

export default VendorRoutes;
