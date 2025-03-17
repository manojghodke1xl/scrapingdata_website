import { lazy } from 'react';
import { Route, Routes } from 'react-router-dom';

const AddContact = lazy(() => import('../../pages/contact/AddContact'));
const ContactList = lazy(() => import('../../pages/contact/ContactList'));
const ContactBulkImport = lazy(() => import('../../pages/contact/ContactBulkImport'));
const PageNotFound = lazy(() => import('../../pages/common/PageNotFound'));

const ContactRoutes = () => {
  return (
    <Routes>
      <Route path="/contact-list" element={<ContactList />} />
      <Route path="/add-contact" element={<AddContact />} />
      <Route path="/edit-contact/:id" element={<AddContact />} />
      <Route path="/import-contacts" element={<ContactBulkImport />} />
      <Route path="*" element={<PageNotFound />} />
    </Routes>
  );
};

export default ContactRoutes;
