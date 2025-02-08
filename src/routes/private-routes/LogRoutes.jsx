import { lazy } from 'react';
import { Route, Routes } from 'react-router-dom';
import EmailLogPreview from '../../pages/socialLogs/emailLogPreview';
import WhatsappLogPreview from '../../pages/socialLogs/whatsappLogPreview';

const WhatsAppLogList = lazy(() => import('../../pages/socialLogs/whatsappList'));
const EmailLogList = lazy(() => import('../../pages/socialLogs/emailList'));
const PageNotFound = lazy(() => import('../../pages/common/PageNotFound'));

const LogRoutes = () => {
  return (
    <Routes>
      <Route path="/whatsapp-log-list" element={<WhatsAppLogList />} />
      <Route path="/email-log-list" element={<EmailLogList />} />
      <Route path="/whatsapp-log-preview/:id" element={<WhatsappLogPreview />} />
      <Route path="/email-log-preview/:id" element={<EmailLogPreview />} />
      <Route path="*" element={<PageNotFound />} />
    </Routes>
  );
};

export default LogRoutes;
