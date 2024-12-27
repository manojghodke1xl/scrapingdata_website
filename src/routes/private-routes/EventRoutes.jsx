import { lazy } from 'react';
import { Route, Routes } from 'react-router-dom';

const EventList = lazy(() => import('../../pages/event/EventList'));
const AddEvent = lazy(() => import('../../pages/event/AddEvent'));

const EventRoutes = () => {
  return (
    <Routes>
      <Route path="/event-list" element={<EventList />} />
      <Route path="/add-event" element={<AddEvent />} />
      <Route path="/edit-event/:id" element={<AddEvent />} />
    </Routes>
  );
};

export default EventRoutes;
