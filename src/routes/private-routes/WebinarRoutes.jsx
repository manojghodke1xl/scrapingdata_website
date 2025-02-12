import { lazy } from 'react';
import { Route, Routes } from 'react-router-dom';
const WebinarList = lazy(() => import('../../pages/webinar/WebinarList'));
const AddWebinar = lazy(() => import('../../pages/webinar/AddWebinar'));

const PageNotFound = lazy(() => import('../../pages/common/PageNotFound'));

const WebinarRoutes = () => {
  return (
    <Routes>
      <Route path="/webinar-list" element={<WebinarList />} />
      <Route path="/add-webinar" element={<AddWebinar />} />
      <Route path="/edit-testimonial/:id" element={<AddWebinar />} />
      <Route path="/duplicate-testimonial/:id" element={<AddWebinar />} />
      <Route path="*" element={<PageNotFound />} />
    </Routes>
  );
};

export default WebinarRoutes;
