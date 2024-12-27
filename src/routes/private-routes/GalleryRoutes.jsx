import { lazy } from 'react';
import { Route, Routes } from 'react-router-dom';

const GalleryList = lazy(() => import('../../pages/gallery/GalleryList'));
const AddGallery = lazy(() => import('../../pages/gallery/AddGallery'));

const GalleryRoutes = () => {
  return (
    <Routes>
      <Route path="/gallery-list" element={<GalleryList />} />
      <Route path="/add-gallery" element={<AddGallery />} />
      <Route path="/edit-gallery/:id" element={<AddGallery />} />
    </Routes>
  );
};

export default GalleryRoutes;
