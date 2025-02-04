import { lazy } from 'react';
import { Route, Routes } from 'react-router-dom';

const AddCertificate = lazy(() => import('../../pages/certificate/AddCertificate'));
const CertificateList = lazy(() => import('../../pages/certificate/CertificateList'));
const PageNotFound = lazy(() => import('../../pages/common/PageNotFound'));

const CertificateRoutes = () => {
  return (
    <Routes>
      <Route path="/certificate-list" element={<CertificateList />} />
      <Route path="/add-certificate" element={<AddCertificate />} />
      <Route path="/edit-certificate/:id" element={<AddCertificate />} />
      <Route path="/duplicate-certificate/:id" element={<AddCertificate />} />
      <Route path="*" element={<PageNotFound />} />
    </Routes>
  );
};

export default CertificateRoutes;
