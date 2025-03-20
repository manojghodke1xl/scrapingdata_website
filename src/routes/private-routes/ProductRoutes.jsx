import { lazy } from 'react';

// Lazy load the AddProduct component
const AddProduct = lazy(() => import('../../pages/product/AddProduct'));
// Lazy load the ProductList component
const ProductList = lazy(() => import('../../pages/product/ProductList'));

// Define routes for product-related pages
const ProductRoutes = [
  // Route to display the list of products
  { path: 'products/product-list', Component: ProductList },
  // Route to add a new product
  { path: 'products/add-product', Component: AddProduct },
  // Route to edit an existing product by ID
  { path: 'products/edit-product/:id', Component: AddProduct }
];

// Export the ProductRoutes array as the default export
export default ProductRoutes;
