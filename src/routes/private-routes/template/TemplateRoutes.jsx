import { lazy } from 'react';

// Email Template Routes
const EmailTemplateList = lazy(() => import('../../../pages/templates/emailTemplate/EmailTemplateList'));
const AddEmailTemplate = lazy(() => import('../../../pages/templates/emailTemplate/AddEmailTemplate'));

// SMS Template Routes
const AddSMSTemplate = lazy(() => import('../../../pages/templates/smsTemplate/AddSMSTemplate'));
const SMSTemplateList = lazy(() => import('../../../pages/templates/smsTemplate/SMSTemplateList'));

// WhatsApp Template Routes
const AddWhatsAppTemplate = lazy(() => import('../../../pages/templates/whatsappTemplate/AddWhatsAppTemplate'));
const WhatsAppTemplateList = lazy(() => import('../../../pages/templates/whatsappTemplate/WhatsAppTemplateList'));

const TemplateRoutes = [
  // Email Template Routes
  { path: 'templates/email-template-list', Component: EmailTemplateList },
  { path: 'templates/add-email-template', Component: AddEmailTemplate },
  { path: 'templates/edit-email-template/:id', Component: AddEmailTemplate },
  { path: 'templates/duplicate-email-template/:id?', Component: AddEmailTemplate },

  // SMS Template Routes
  { path: 'templates/sms-template-list', Component: SMSTemplateList },
  { path: 'templates/add-sms-template', Component: AddSMSTemplate },
  { path: 'templates/edit-sms-template/:id', Component: AddSMSTemplate },
  { path: 'templates/duplicate-sms-template/:id', Component: AddSMSTemplate },

  // WhatsApp Template Routes
  { path: 'templates/whatsapp-template-list', Component: WhatsAppTemplateList },
  { path: 'templates/add-whatsapp-template', Component: AddWhatsAppTemplate },
  { path: 'templates/edit-whatsapp-template/:id', Component: AddWhatsAppTemplate },
  { path: 'templates/duplicate-whatsapp-template/:id', Component: AddWhatsAppTemplate }
];

export default TemplateRoutes;

