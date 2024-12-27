import { lazy } from 'react';
import { Route, Routes } from 'react-router-dom';

const EnquiryList = lazy(() => import('../../pages/enquiry/EnquiryList'));
const ViewEnquiry = lazy(() => import('../../pages/enquiry/ViewEnquiry'));
const EnquiryIntegration = lazy(() => import('../../pages/enquiry/EnquiryIntegration'));

const EnquiryRoutes = () => {
  return (
    <Routes>
      <Route path="/enquiry-list" element={<EnquiryList />} />
      <Route path="/view-enquiry/:id" element={<ViewEnquiry />} />
      <Route path="/enquiry-integration" element={<EnquiryIntegration />} />
    </Routes>
  );
};

export default EnquiryRoutes;
