import { lazy } from 'react';

// Lazy load the PopupList component
const PopupList = lazy(() => import('../../pages/popup/PopupList'));
// Lazy load the AddPopup component
const AddPopup = lazy(() => import('../../pages/popup/AddPopup'));
// Lazy load the PopupIntegration component
const PopupIntegration = lazy(() => import('../../pages/popup/PopupIntegration'));

const PopupRoutes = [
  // Route to display the list of popups
  { path: 'pop-up/pop-up-list', Component: PopupList },
  // Route to add a new popup
  { path: 'pop-up/add-pop-up', Component: AddPopup },
  // Route to edit an existing popup by ID
  { path: 'pop-up/edit-pop-up/:id', Component: AddPopup },
  // Route to duplicate an existing popup by ID
  { path: 'pop-up/duplicate-pop-up/:id', Component: AddPopup },
  // Route to display the popup integration page
  { path: 'pop-up/pop-up-integration', Component: PopupIntegration }
];

export default PopupRoutes;
