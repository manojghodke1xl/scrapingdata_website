import { lazy } from 'react';
import { Route, Routes } from 'react-router-dom';

const AddGuides = lazy(() => import('../../pages/guides/AddGuides'));
const GuidesList = lazy(() => import('../../pages/guides/GuidesList'));
const GuildesIntegration = lazy(() => import('../../pages/guides/GuidesIntegration'));
const PageNotFound = lazy(() => import('../../pages/common/PageNotFound'));

const GuidesRoutes = () => {
  return (
    <Routes>
      <Route path="/guides-list" element={<GuidesList />} />
      <Route path="/add-guides" element={<AddGuides />} />
      <Route path="/edit-guides/:id" element={<AddGuides />} />
      <Route path="/guides-integration" element={<GuildesIntegration />} />
      <Route path="*" element={<PageNotFound />} />
    </Routes>
  );
};

export default GuidesRoutes;
