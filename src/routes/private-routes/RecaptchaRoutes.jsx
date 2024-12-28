import { lazy } from 'react';
import { Route, Routes } from 'react-router-dom';

const RecaptchaList = lazy(() => import('../../pages/recaptcha/RecaptchaList'));
const AddRecaptcha = lazy(() => import('../../pages/recaptcha/AddRecaptcha'));
const PageNotFound = lazy(() => import('../../pages/common/PageNotFound'));

const RecaptchaRoutes = () => {
  return (
    <Routes>
      <Route path="/recaptcha-list" element={<RecaptchaList />} />
      <Route path="/add-recaptcha" element={<AddRecaptcha />} />
      <Route path="/edit-recaptcha/:id" element={<AddRecaptcha />} />
      <Route path="*" element={<PageNotFound />} />
    </Routes>
  );
};

export default RecaptchaRoutes;
