import { lazy } from 'react';
import { Route, Routes } from 'react-router-dom';

const WebinarList = lazy(() => import('../../pages/webinar/WebinarList'));
const AddWebinar = lazy(() => import('../../pages/webinar/AddWebinar'));
const WebinarLinkList = lazy(() => import('../../pages/webinar/WebinarLinkList'));

const PageNotFound = lazy(() => import('../../pages/common/PageNotFound'));

const WebinarRoutes = () => {
  return (
    <Routes>
      <Route path="/webinar-list" element={<WebinarList />} />
      <Route path="/add-webinar" element={<AddWebinar />} />
      <Route path="/edit-webinar/:id" element={<AddWebinar />} />
      <Route path="/duplicate-webinar/:id" element={<AddWebinar />} />
      <Route path="/webinar-link" element={<WebinarLinkList />} />
      <Route path="*" element={<PageNotFound />} />
    </Routes>
  );
};

export default WebinarRoutes;
