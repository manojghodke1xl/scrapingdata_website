import { lazy } from 'react';

// Lazy load the GalleryList component to display a list of galleries
const GalleryList = lazy(() => import('../../pages/gallery/GalleryList'));
// Lazy load the AddGallery component to add or edit a gallery
const AddGallery = lazy(() => import('../../pages/gallery/AddGallery'));
// Lazy load the ViewGallery component to view gallery
const ViewGallery = lazy(() => import('../../pages/gallery/ViewGallery'));

// Define routes for the gallery feature
const GalleryRoutes = [
  // Route to display a list of galleries
  { path: 'gallery/gallery-list', Component: GalleryList },
  // Route to add a new gallery
  { path: 'gallery/add-gallery', Component: AddGallery },
  // Route to edit an existing gallery by ID
  { path: 'gallery/edit-gallery/:id', Component: AddGallery },
  // Route to duplicate an existing gallery by ID
  { path: 'gallery/duplicate-gallery/:id', Component: AddGallery },
  // Route to view a gallery by ID
  { path: 'gallery/view-gallery/:id', Component: ViewGallery },

];

// Export the GalleryRoutes array as the default export
export default GalleryRoutes;

