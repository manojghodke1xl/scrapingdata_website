import { lazy } from 'react';
import { Routes, Route } from 'react-router-dom';

const AddAdmin = lazy(() => import('../../pages/admin/AddAdmin'));
const AdminList = lazy(() => import('../../pages/admin/AdminList'));

const AdminRoutes = () => {
  return (
    <Routes>
      <Route path="/admin-list" element={<AdminList />} />
      <Route path="/add-admin" element={<AddAdmin />} />
      <Route path="/edit-admin/:id" element={<AddAdmin />} />
    </Routes>
  );
};

export default AdminRoutes;
