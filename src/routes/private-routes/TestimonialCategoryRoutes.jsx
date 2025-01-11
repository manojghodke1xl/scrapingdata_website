import { lazy } from 'react';
import { Route, Routes } from 'react-router-dom';

const AddTestimonialCategory = lazy(() => import('../../pages/testimonialCategory/AddTestimonialCategory'));
const TestimonialCategoryList = lazy(() => import('../../pages/testimonialCategory/TestimonialCategoryList'));
const PageNotFound = lazy(() => import('../../pages/common/PageNotFound'));

const TestimonialCategoryRoutes = () => {
  return (
    <Routes>
      <Route path="/testimonial-category-list" element={<TestimonialCategoryList />} />
      <Route path="/add-testimonial-category" element={<AddTestimonialCategory />} />
      <Route path="/edit-testimonial-category/:id" element={<AddTestimonialCategory />} />
      <Route path="*" element={<PageNotFound />} />
    </Routes>
  );
};

export default TestimonialCategoryRoutes;
