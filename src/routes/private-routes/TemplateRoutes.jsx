import { lazy } from 'react';
import { Route, Routes } from 'react-router-dom';

const EmailTemplateList = lazy(() => import('../../pages/templates/emailTemplate/EmailTemplateList'));
const AddEmailTemplate = lazy(() => import('../../pages/templates/emailTemplate/AddEmailTemplate'));
const AddTemplateCategory = lazy(() => import('../../pages/templates/templateCategory/AddTemplateCategory'));
const TemplateCategoryList = lazy(() => import('../../pages/templates/templateCategory/TemplateCategoryList'));
const PageNotFound = lazy(() => import('../../pages/common/PageNotFound'));

const TemplateRoutes = () => {
  return (
    <Routes>
      <Route path="/email-template-list" element={<EmailTemplateList />} />
      <Route path="/add-email-template" element={<AddEmailTemplate />} />
      <Route path="/edit-email-template/:id" element={<AddEmailTemplate />} />
      <Route path="/add-template-category" element={<AddTemplateCategory />} />
      <Route path="/edit-template-category/:id" element={<AddTemplateCategory />} />
      <Route path="/template-category-list" element={<TemplateCategoryList />} />

      <Route path="*" element={<PageNotFound />} />
    </Routes>
  );
};

export default TemplateRoutes;
