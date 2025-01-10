import { lazy } from 'react';
import { Route, Routes } from 'react-router-dom';

const PackageList = lazy(() => import('../../pages/package/PackageList'));
const AddPackage = lazy(() => import('../../pages/package/AddPackage'));

const PackageRoutes = () => {
  return (
    <Routes>
      <Route path="/package-list" element={<PackageList />} />
      <Route path="/add-package" element={<AddPackage />} />
      <Route path="/edit-package/:id" element={<AddPackage />} />
    </Routes>
  );
};
export default PackageRoutes;
