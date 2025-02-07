import { lazy } from 'react';
import { Route, Routes } from 'react-router-dom';

const AdvertisementList = lazy(() => import('../../../pages/leads/advertisement/AdvertisementList'));
const AddAdvertisement = lazy(() => import('../../../pages/leads/advertisement/AddAdvertisement'));
const ViewAdvertisement = lazy(() => import('../../../pages/leads/advertisement/ViewAdvertisement'));
const AdvertisementIntegration = lazy(() => import('../../../pages/leads/advertisement/AdvertisementIntegration'));
const PageNotFound = lazy(() => import('../../../pages/common/PageNotFound'));

const AdvertisementRoutes = () => {
  return (
    <Routes>
      <Route path="/advertisement-list" element={<AdvertisementList />} />
      <Route path="/add-advertisement" element={<AddAdvertisement />} />
      {/* <Route path="/edit-advertisement/:id" element={<AddAdvertisement />} /> */}
      <Route path="/view-advertisement/:id" element={<ViewAdvertisement />} />
      <Route path="/advertisement-integration" element={<AdvertisementIntegration />} />
      <Route path="*" element={<PageNotFound />} />
    </Routes>
  );
};

export default AdvertisementRoutes;
