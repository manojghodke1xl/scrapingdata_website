import { lazy } from 'react';
import { Route, Routes } from 'react-router-dom';

const TestimonialList = lazy(() => import('../../pages/testimonials/TestimonialList'));
const AddTestimonial = lazy(() => import('../../pages/testimonials/AddTestimonial'));
const PageNotFound = lazy(() => import('../../pages/common/PageNotFound'));

const LogRoutes = () => {
  return (
    <Routes>
      <Route path="/whatsapp-log-list" element={<TestimonialList />} />
      <Route path="/email-log-list" element={<TestimonialList />} />
      <Route path="*" element={<PageNotFound />} />
    </Routes>
  );
};

export default LogRoutes;
