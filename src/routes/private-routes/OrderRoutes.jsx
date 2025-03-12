import { lazy } from 'react';
import { Route, Routes } from 'react-router-dom';

const OrderList = lazy(() => import('../../pages/orders/OrderList'));
const PageNotFound = lazy(() => import('../../pages/common/PageNotFound'));

const OrderRoutes = () => {
  return (
    <Routes>
      <Route path="/order-list" element={<OrderList />} />
      <Route path="*" element={<PageNotFound />} />
    </Routes>
  );
};

export default OrderRoutes;
