import { lazy } from 'react';
import { Route, Routes } from 'react-router-dom';

const FaqCategoryList = lazy(() => import('../../pages/faqCategory/FaqCategoryList'));
const AddFaqCategory = lazy(() => import('../../pages/faqCategory/AddFaqCategory'));
const FaqList = lazy(() => import('../../pages/faq/FaqList'));
const AddFaq = lazy(() => import('../../pages/faq/AddFaq'));

const FaqRoutes = () => {
  return (
    <Routes>
      <Route path="/faq-list" element={<FaqList />} />
      <Route path="/add-faq" element={<AddFaq />} />
      <Route path="/edit-faq/:id" element={<AddFaq />} />
      <Route path="/faq-category-list" element={<FaqCategoryList />} />
      <Route path="/add-faq-category" element={<AddFaqCategory />} />
      <Route path="/edit-faq-category/:id" element={<AddFaqCategory />} />
    </Routes>
  );
};

export default FaqRoutes;
