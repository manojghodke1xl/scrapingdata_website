import { lazy } from 'react';
import { Route, Routes } from 'react-router-dom';

const SiteList = lazy(() => import('../../pages/site/SiteList'));
const AddSite = lazy(() => import('../../pages/site/AddSite'));
const PageNotFound = lazy(() => import('../../pages/common/PageNotFound'));

const SiteRoutes = () => {
  return (
    <Routes>
      <Route path="/website-list" element={<SiteList />} />
      <Route path="/add-website" element={<AddSite />} />
      <Route path="/edit-website/:id" element={<AddSite />} />
      <Route path="*" element={<PageNotFound />} />
    </Routes>
  );
};

export default SiteRoutes;
