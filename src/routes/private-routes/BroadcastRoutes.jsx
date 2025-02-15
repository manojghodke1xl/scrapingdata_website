import { lazy } from 'react';
import { Route, Routes } from 'react-router-dom';

const BroadcastList = lazy(() => import('../../pages/broadcast/BroadcastList'));
const AddBroadcast = lazy(() => import('../../pages/broadcast/AddBroadcast'));
const PageNotFound = lazy(() => import('../../pages/common/PageNotFound'));

const BroadcastRoutes = () => {
  return (
    <Routes>
      <Route path="/broadcast-list" element={<BroadcastList />} />
      <Route path="/add-broadcast" element={<AddBroadcast />} />
      <Route path="/edit-broadcast/:id" element={<AddBroadcast />} />
      <Route path="/duplicate-broadcast/:id" element={<AddBroadcast />} />
      <Route path="*" element={<PageNotFound />} />
    </Routes>
  );
};

export default BroadcastRoutes;
