import { lazy } from 'react';
import { Route, Routes } from 'react-router-dom';

const SiteList = lazy(() => import('../../pages/site/SiteList'));
const AddSite = lazy(() => import('../../pages/site/AddSite'));

const SiteRoutes = () => {
  return (
    <Routes>
      <Route path="/website-list" element={<SiteList />} />
      <Route path="/add-website" element={<AddSite />} />
      <Route path="/edit-website/:id" element={<AddSite />} />
    </Routes>
  );
};

export default SiteRoutes;
