import { lazy } from 'react';
import { Route, Routes } from 'react-router-dom';

const UTMBuilderList = lazy(() => import('../../pages/utmBuilder/UTMBuilderList'));
const AddUTMBuilder = lazy(() => import('../../pages/utmBuilder/AddUTMBuilder'));
const PageNotFound = lazy(() => import('../../pages/common/PageNotFound'));

const UTMBuilderRoutes = () => {
  return (
    <Routes>
      <Route path="/utm-builder-list" element={<UTMBuilderList />} />
      <Route path="/add-utm-builder" element={<AddUTMBuilder />} />
      <Route path="/edit-utm-builder/:id" element={<AddUTMBuilder />} />
      <Route path="/duplicate-utm-builder/:id" element={<AddUTMBuilder />} />
      <Route path="*" element={<PageNotFound />} />
    </Routes>
  );
};

export default UTMBuilderRoutes;
