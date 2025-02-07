import { lazy } from 'react';
import { Routes, Route } from 'react-router-dom';
// import PageNotFound from '../../pages/common/PageNotFound';

const AddAdmin = lazy(() => import('../../pages/admin/AddAdmin'));
const AdminList = lazy(() => import('../../pages/admin/AdminList'));
const AdminSettings = lazy(() => import('../../pages/admin/AdminSettings'));
const PageNotFound = lazy(() => import('../../pages/common/PageNotFound'));

const AdminRoutes = () => {
  return (
    <Routes>
      <Route path="/admin-list" element={<AdminList />} />
      <Route path="/add-admin" element={<AddAdmin />} />
      <Route path="/edit-admin/:id" element={<AddAdmin />} />
      <Route path="/admin-settings" element={<AdminSettings />} />
      <Route path="*" element={<PageNotFound />} />
    </Routes>
  );
};

export default AdminRoutes;
