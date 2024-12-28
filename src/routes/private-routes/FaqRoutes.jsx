import { lazy } from 'react';
import { Route, Routes } from 'react-router-dom';

const FaqList = lazy(() => import('../../pages/faq/FaqList'));
const AddFaq = lazy(() => import('../../pages/faq/AddFaq'));
const PageNotFound = lazy(() => import('../../pages/common/PageNotFound'));

const FaqRoutes = () => {
  return (
    <Routes>
      <Route path="/faq-list" element={<FaqList />} />
      <Route path="/add-faq" element={<AddFaq />} />
      <Route path="/edit-faq/:id" element={<AddFaq />} />
      <Route path="*" element={<PageNotFound />} />
    </Routes>
  );
};

export default FaqRoutes;
