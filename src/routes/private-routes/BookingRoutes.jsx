import { lazy } from 'react';

// Lazy load the BookingList component
const BookingList = lazy(() => import('../../pages/booking/BookingList'));

// Define the routes for the booking feature
const BookingRoutes = [
  // Route to display the list of bookings
  { path: 'bookings/booking-list', Component: BookingList }
];

// Export the BookingRoutes array as the default export
export default BookingRoutes;
