import { lazy } from 'react';

// Lazy load the AddCertificate component
const AddCertificate = lazy(() => import('../../pages/certificate/AddCertificate'));
// Lazy load the CertificateList component
const CertificateList = lazy(() => import('../../pages/certificate/CertificateList'));

// Define the routes for the certificate feature
const CertificateRoutes = [
  // Route for listing certificates
  { path: 'certificates/certificate-list', Component: CertificateList },
  // Route for adding a new certificate
  { path: 'certificates/add-certificate', Component: AddCertificate },
  // Route for editing an existing certificate by ID
  { path: 'certificates/edit-certificate/:id', Component: AddCertificate },
  // Route for duplicating an existing certificate by ID
  { path: 'certificates/duplicate-certificate/:id', Component: AddCertificate }
];

// Export the CertificateRoutes array as the default export
export default CertificateRoutes;

