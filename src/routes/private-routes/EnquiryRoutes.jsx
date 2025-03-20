import { lazy } from 'react';

// Lazy load the EnquiryList component
const EnquiryList = lazy(() => import('../../pages/enquiry/EnquiryList'));
// Lazy load the AddEnquiry component
const AddEnquiry = lazy(() => import('../../pages/enquiry/AddEnquiry'));
// Lazy load the ViewEnquiry component
const ViewEnquiry = lazy(() => import('../../pages/enquiry/ViewEnquiry'));
// Lazy load the EnquiryIntegration component
const EnquiryIntegration = lazy(() => import('../../pages/enquiry/EnquiryIntegration'));

// Define routes for enquiry-related pages
const EnquiryRoutes = [
  // Route for listing enquiries
  { path: 'enquiry/enquiry-list', Component: EnquiryList },
  // Route for adding a new enquiry
  { path: 'enquiry/add-enquiry', Component: AddEnquiry },
  // Route for viewing a specific enquiry by ID
  { path: 'enquiry/view-enquiry/:id', Component: ViewEnquiry },
  // Route for enquiry integrations
  { path: 'enquiry/enquiry-integration', Component: EnquiryIntegration }
];

// Export the EnquiryRoutes array as the default export
export default EnquiryRoutes;
