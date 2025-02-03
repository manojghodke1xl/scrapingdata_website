import { lazy } from 'react';
import { Route, Routes } from 'react-router-dom';

const EventDefaultSettings = lazy(() => import('../../pages/afterSale/EventDefaultSettings'));
const PageNotFound = lazy(() => import('../../pages/common/PageNotFound'));

const AfterSalesRoutes = () => {
  return (
    <Routes>
      <Route path="/settings" element={<EventDefaultSettings />} />
      <Route path="*" element={<PageNotFound />} />
    </Routes>
  );
};

export default AfterSalesRoutes;
