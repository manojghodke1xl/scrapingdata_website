import { lazy } from 'react';
import { Route, Routes } from 'react-router-dom';

const SiteList = lazy(() => import('../../pages/site/SiteList'));
const AddSite = lazy(() => import('../../pages/site/AddSite'));
const SiteNotificationSettings = lazy(() => import('../../pages/site/SiteNotificationSettings'));
const PageNotFound = lazy(() => import('../../pages/common/PageNotFound'));

const SiteRoutes = () => {
  return (
    <Routes>
      <Route path="/site-list" element={<SiteList />} />
      <Route path="/add-site" element={<AddSite />} />
      <Route path="/edit-site/:id" element={<AddSite />} />
      <Route path="/site-settings" element={<SiteNotificationSettings />} />
      <Route path="*" element={<PageNotFound />} />
    </Routes>
  );
};

export default SiteRoutes;
