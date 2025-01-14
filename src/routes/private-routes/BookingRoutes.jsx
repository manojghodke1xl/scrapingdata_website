import { lazy } from 'react';
import { Route, Routes } from 'react-router-dom';

const BookingList = lazy(() => import('../../pages/booking/BookingList'));
const PageNotFound = lazy(() => import('../../pages/common/PageNotFound'));

const BookingRoutes = () => {
  return (
    <Routes>
      <Route path="/booking-list" element={<BookingList />} />
      <Route path="*" element={<PageNotFound />} />
    </Routes>
  );
};

export default BookingRoutes;
