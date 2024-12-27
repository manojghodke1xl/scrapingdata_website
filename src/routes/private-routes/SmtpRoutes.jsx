import { Route, Routes } from 'react-router-dom';
import { lazy } from 'react';

const AddSmtp = lazy(() => import('../../pages/smtp/AddSmtp'));
const SmtpList = lazy(() => import('../../pages/smtp/SmtpList'));

const SmtpRoutes = () => {
  return (
    <Routes>
      <Route path="/smtp-list" element={<SmtpList />} />
      <Route path="/add-smtp" element={<AddSmtp />} />
      <Route path="/edit-smtp/:id" element={<AddSmtp />} />
    </Routes>
  );
};

export default SmtpRoutes;
