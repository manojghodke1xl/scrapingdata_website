import { lazy } from 'react';

// EventDefaultSettings component is used to set default settings for events
const EventDefaultSettings = lazy(() => import('../../pages/afterSale/EventDefaultSettings'));
// AfterSalesList component is used to list all after-sales
const AfterSalesList = lazy(() => import('../../pages/afterSale/AfterSalesList'));
// AddAfterSale component is used to add a new after-sale
const AddAfterSale = lazy(() => import('../../pages/afterSale/AddAfterSale'));

const AfterSalesRoutes = [
  // Route for setting default settings for events
  { path: 'after-sales/event-default-settings', Component: EventDefaultSettings },
  // Route for listing all after-sales
  { path: 'after-sales/after-sales-list', Component: AfterSalesList },
  // Route for adding a new after-sale
  { path: 'after-sales/add-after-sale', Component: AddAfterSale },
  // Route for editing an existing after-sale
  { path: 'after-sales/edit-after-sale/:id', Component: AddAfterSale },
  // Route for duplicating an existing after-sale
  { path: 'after-sales/duplicate-after-sale/:id', Component: AddAfterSale }
];

export default AfterSalesRoutes;
