import { lazy } from 'react';
import { Route, Routes } from 'react-router-dom';

const EventTicketList = lazy(() => import('../../pages/eventTicket/EventTicketList'));
const AddEventTicket = lazy(() => import('../../pages/eventTicket/AddEventTicket'));
const PageNotFound = lazy(() => import('../../pages/common/PageNotFound'));

const EventTicketRoutes = () => {
  return (
    <Routes>
      <Route path="/ticket-list" element={<EventTicketList />} />
      <Route path="/add-ticket" element={<AddEventTicket />} />
      <Route path="/edit-ticket/:id" element={<AddEventTicket />} />
      <Route path="*" element={<PageNotFound />} />
    </Routes>
  );
};

export default EventTicketRoutes;
