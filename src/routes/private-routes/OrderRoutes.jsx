import { lazy } from 'react';

// The OrderList component displays a list of orders.
const OrderList = lazy(() => import('../../pages/orders/OrderList'));

// The OrderRoutes array defines the routes for the orders feature.
const OrderRoutes = [
  // Route to display a list of orders
  { path: 'orders/order-list', Component: OrderList }
];

// The default export is the OrderRoutes array.
export default OrderRoutes;
