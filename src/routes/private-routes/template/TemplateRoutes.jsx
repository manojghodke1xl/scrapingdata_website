import { lazy } from 'react';
import { Route, Routes } from 'react-router-dom';

const EmailTemplateList = lazy(() => import('../../../pages/templates/emailTemplate/EmailTemplateList'));
const AddEmailTemplate = lazy(() => import('../../../pages/templates/emailTemplate/AddEmailTemplate'));

const AddSMSTemplate = lazy(() => import('../../../pages/templates/smsTemplate/AddSMSTemplate'));
const SMSTemplateList = lazy(() => import('../../../pages/templates/smsTemplate/SMSTemplateList'));

const AddWhatsAppTemplate = lazy(() => import('../../../pages/templates/whatsappTemplate/AddWhatsAppTemplate'));
const WhatsAppTemplateList = lazy(() => import('../../../pages/templates/whatsappTemplate/WhatsAppTemplateList'));

const PageNotFound = lazy(() => import('../../../pages/common/PageNotFound'));

const TemplateRoutes = () => {
  return (
    <Routes>
      {/* Email Template Routes */}
      <Route path="/email-template-list" element={<EmailTemplateList />} />
      <Route path="/add-email-template" element={<AddEmailTemplate />} />
      <Route path="/edit-email-template/:id" element={<AddEmailTemplate />} />

      {/* SMS Template Routes */}
      <Route path="/sms-template-list" element={<SMSTemplateList />} />
      <Route path="/add-sms-template" element={<AddSMSTemplate />} />
      <Route path="/edit-sms-template/:id" element={<AddSMSTemplate />} />

      {/* WhatsApp Template Routes */}
      <Route path="/whatsapp-template-list" element={<WhatsAppTemplateList />} />
      <Route path="/add-whatsapp-template" element={<AddWhatsAppTemplate />} />
      <Route path="/edit-whatsapp-template/:id" element={<AddWhatsAppTemplate />} />

      <Route path="*" element={<PageNotFound />} />
    </Routes>
  );
};

export default TemplateRoutes;
