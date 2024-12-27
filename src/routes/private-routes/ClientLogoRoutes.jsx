import { lazy } from 'react';
import { Route, Routes } from 'react-router-dom';

const ClientLogoList = lazy(() => import('../../pages/clientLogo/ClientLogoList'));
const AddClientLogo = lazy(() => import('../../pages/clientLogo/AddClientLogo'));

const ClientLogoRoutes = () => {
  return (
    <Routes>
      <Route path="/client-logo-list" element={<ClientLogoList />} />
      <Route path="/add-client-logo" element={<AddClientLogo />} />
      <Route path="/edit-client-logo/:id" element={<AddClientLogo />} />
    </Routes>
  );
};

export default ClientLogoRoutes;
