import { lazy } from 'react';
import { Route, Routes } from 'react-router-dom';

const EventDefaultSettings = lazy(() => import('../../pages/afterSale/EventDefaultSettings'));
const AfterSalesList = lazy(() => import('../../pages/afterSale/AfterSalesList'));
const AddAfterSale = lazy(() => import('../../pages/afterSale/AddAfterSale'));
const PageNotFound = lazy(() => import('../../pages/common/PageNotFound'));

const AfterSalesRoutes = () => {
  return (
    <Routes>
      <Route path="/event-default-settings" element={<EventDefaultSettings />} />
      <Route path="/after-sales-list" element={<AfterSalesList />} />
      <Route path="/add-after-sale" element={<AddAfterSale />} />
      <Route path="/edit-after-sale/:id" element={<AddAfterSale />} />
      <Route path="*" element={<PageNotFound />} />
    </Routes>
  );
};

export default AfterSalesRoutes;
