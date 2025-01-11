import { lazy } from 'react';
import { Route, Routes } from 'react-router-dom';

const AddProduct = lazy(() => import('../../pages/product/AddProduct'));
const ProductList = lazy(() => import('../../pages/product/ProductList'));

const ProductRoutes = () => {
  return (
    <Routes>
      <Route path="/product-list" element={<ProductList />} />
      <Route path="/add-product" element={<AddProduct />} />
      <Route path="/edit-product/:id" element={<AddProduct />} />
    </Routes>
  );
};

export default ProductRoutes;
