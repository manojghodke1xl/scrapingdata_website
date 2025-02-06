import { lazy } from 'react';
import { Route, Routes } from 'react-router-dom';
// import WhatsAppLogList from '../../pages/socialLogs/whatsappList';
// import EmailLogList from '../../pages/socialLogs/emailList';

const WhatsAppLogList = lazy(() => import('../../pages/socialLogs/whatsappList'));
const EmailLogList = lazy(() => import('../../pages/socialLogs/emailList'));
const PageNotFound = lazy(() => import('../../pages/common/PageNotFound'));

const LogRoutes = () => {
  return (
    <Routes>
      <Route path="/whatsapp-log-list" element={<WhatsAppLogList />} />
      <Route path="/email-log-list" element={<EmailLogList />} />
      <Route path="*" element={<PageNotFound />} />
    </Routes>
  );
};

export default LogRoutes;
