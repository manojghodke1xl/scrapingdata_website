import { lazy } from 'react';
import { Route, Routes } from 'react-router-dom';

const EnquiryList = lazy(() => import('../../pages/enquiry/EnquiryList'));
const AddEnquiry = lazy(() => import('../../pages/enquiry/AddEnquiry'));
const ViewEnquiry = lazy(() => import('../../pages/enquiry/ViewEnquiry'));
const EnquiryIntegration = lazy(() => import('../../pages/enquiry/EnquiryIntegration'));
const PageNotFound = lazy(() => import('../../pages/common/PageNotFound'));

const EnquiryRoutes = () => {
  return (
    <Routes>
      <Route path="/enquiry-list" element={<EnquiryList />} />
      <Route path="/add-enquiry" element={<AddEnquiry />} />
      <Route path="/view-enquiry/:id" element={<ViewEnquiry />} />
      <Route path="/enquiry-integration" element={<EnquiryIntegration />} />
      <Route path="*" element={<PageNotFound />} />
    </Routes>
  );
};

export default EnquiryRoutes;
