import { lazy } from 'react';
import { Route, Routes } from 'react-router-dom';

const PopupList = lazy(() => import('../../pages/popup/PopupList'));
const AddPopup = lazy(() => import('../../pages/popup/AddPopup'));
const PopupIntegration = lazy(() => import('../../pages/popup/PopupIntegration'));
const PageNotFound = lazy(() => import('../../pages/common/PageNotFound'));

const PopupRoutes = () => {
  return (
    <Routes>
      <Route path="/pop-up-list" element={<PopupList />} />
      <Route path="/add-pop-up" element={<AddPopup />} />
      <Route path="/edit-pop-up/:id" element={<AddPopup />} />
      <Route path="/pop-up-integration" element={<PopupIntegration />} />
      <Route path="/duplicate-pop-up/:id" element={<AddPopup />} />
      <Route path="*" element={<PageNotFound />} />
    </Routes>
  );
};

export default PopupRoutes;
