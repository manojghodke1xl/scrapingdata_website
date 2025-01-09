import { lazy } from 'react';
import { Route, Routes } from 'react-router-dom';

const TestimonialList = lazy(() => import('../../pages/testimonials/TestimonialList'));
const AddTestimonial = lazy(() => import('../../pages/testimonials/AddTestimonial'));
const AddTestimonialCategory = lazy(() => import('../../pages/testimonialCategory/AddTestimonialCategory'));
const TestimonialCategoryList = lazy(() => import('../../pages/testimonialCategory/TestimonialCategoryList'));
const PageNotFound = lazy(() => import('../../pages/common/PageNotFound'));

const TestimonialRoutes = () => {
  return (
    <Routes>
      <Route path="/testimonial-list" element={<TestimonialList />} />
      <Route path="/add-testimonial" element={<AddTestimonial />} />
      <Route path="/edit-testimonial/:id" element={<AddTestimonial />} />
      <Route path="/testimonial-category-list" element={<TestimonialCategoryList />} />
      <Route path="/add-testimonials-category" element={<AddTestimonialCategory />} />
      <Route path="/edit-testimonials-category/:id" element={<AddTestimonialCategory />} />
      <Route path="*" element={<PageNotFound />} />
    </Routes>
  );
};

export default TestimonialRoutes;
