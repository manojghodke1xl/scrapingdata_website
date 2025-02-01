import { lazy } from 'react';
import { Route, Routes } from 'react-router-dom';

const AddTemplateCategory = lazy(() => import('../../../pages/templates/templateCategory/AddTemplateCategory'));
const TemplateCategoryList = lazy(() => import('../../../pages/templates/templateCategory/TemplateCategoryList'));
const PageNotFound = lazy(() => import('../../../pages/common/PageNotFound'));

const TemplateCategoryRoutes = () => {
  return (
    <Routes>
      <Route path="/add-template-category" element={<AddTemplateCategory />} />
      <Route path="/edit-template-category/:id" element={<AddTemplateCategory />} />
      <Route path="/template-category-list" element={<TemplateCategoryList />} />

      <Route path="*" element={<PageNotFound />} />
    </Routes>
  );
};

export default TemplateCategoryRoutes;
