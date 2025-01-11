import { lazy } from 'react';
import { Route, Routes } from 'react-router-dom';

const AddProduct = lazy(() => import('../../pages/product/AddProduct'));

const ProductRoutes = () => {
  return (
    <Routes>
      <Route path="/add-product" element={<AddProduct />} />
    </Routes>
  );
};

export default ProductRoutes;
