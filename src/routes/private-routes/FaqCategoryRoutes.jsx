import { lazy } from 'react';
import { Route, Routes } from 'react-router-dom';

const FaqCategoryList = lazy(() => import('../../pages/faqCategory/FaqCategoryList'));
const AddFaqCategory = lazy(() => import('../../pages/faqCategory/AddFaqCategory'));
const PageNotFound = lazy(() => import('../../pages/common/PageNotFound'));

const FaqCategoryRoutes = () => {
  return (
    <Routes>
      <Route path="/faq-category-list" element={<FaqCategoryList />} />
      <Route path="/add-faq-category" element={<AddFaqCategory />} />
      <Route path="/edit-faq-category/:id" element={<AddFaqCategory />} />
      <Route path="*" element={<PageNotFound />} />
    </Routes>
  );
};

export default FaqCategoryRoutes;
