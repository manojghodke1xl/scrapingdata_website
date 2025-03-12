import { lazy } from 'react';
import { Route, Routes } from 'react-router-dom';

const OrderList = lazy(() => import('../../pages/orders/OrderList'));
const ViewOrders = lazy(() => import('../../pages/orders/ViewOrders'));
const PageNotFound = lazy(() => import('../../pages/common/PageNotFound'));

const OrderRoutes = () => {
  return (
    <Routes>
      <Route path="/order-list" element={<OrderList />} />
      <Route path="/view-order/:id" element={<ViewOrders />} />
      <Route path="*" element={<PageNotFound />} />
    </Routes>
  );
};

export default OrderRoutes;
