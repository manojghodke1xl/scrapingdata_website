import { RiAdminLine } from 'react-icons/ri';
import { RxDashboard } from 'react-icons/rx';
import { TbApps, TbWorld } from 'react-icons/tb';

export const navLinks = [
  { title: 'Dashboard', to: ['/dashboard'], icon: <RxDashboard /> },
  {
    title: 'Apps',
    to: ['/apps/app', '/apps/integration/razorpay', '/apps/integration/stripe', '/apps/integration/paypal'],
    icon: <TbApps />
  },
  { title: 'All Sites', to: ['/site/site-list', '/site/add-site', '/site/edit-site'], icon: <TbWorld /> }
];

export const leadsPath = [
  { title: 'Enquiry', to: ['/enquiry/enquiry-list', '/enquiry/view-enquiry', '/enquiry/enquiry-integration'] },
  { title: 'Newsletter Subscribers', to: ['/subscriber/subscriber-list', '/subscriber/view-subscriber', '/subscriber/subscriber-integration'] },
  { title: 'Feedbacks', to: ['/feedback/feedback-list', '/feedback/view-feedback', '/feedback/feedback-integration'] }
];

export const contentsPath = [
  {
    title: 'Case Studies',
    to: ['/case-study/case-study-list', '/case-study/add-case-study', '/case-study/edit-case-study', '/case-study/case-study-integration', '/case-study/duplicate-case-study']
  },
  { title: 'Guides', to: ['/guides/guides-list', '/guides/add-guide', '/guides/edit-guide', '/guides/guides-integration', '/guides/duplicate-guide'] },
  { title: 'Pop-ups', to: ['/pop-up/pop-up-list', '/pop-up/add-pop-up', '/pop-up/edit-pop-up'] }
];

export const marketingPath = [{ title: 'Coupons', to: ['/coupon/coupon-list', '/coupon/add-coupon', '/coupon/edit-coupon', '/coupon/duplicate-coupon'] }];

export const productsPath = [
  { title: 'Products', to: ['/products/product-list', '/products/add-product', '/products/edit-product', '/products/duplicate-product'] },
  { title: 'Orders', to: ['/orders/order-list'] },
  { title: 'Order Payments', to: ['/payments/order-payment-list'] }
];

export const siteSettingsPath = [
  { title: 'SMTP Settings', to: ['/smtp/smtp-list', '/smtp/add-smtp', '/smtp/edit-smtp'] },
  { title: 'reCAPTCHA Settings', to: ['/recaptcha/recaptcha-list', '/recaptcha/add-recaptcha', '/recaptcha/edit-recaptcha', '/recaptcha/duplicate-recaptcha'] }
];

export const mediaPath = [
  { title: 'Client Logo', to: ['/client-logo/client-logo-list', '/client-logo/add-client-logo', '/client-logo/edit-client-logo', '/client-logo/duplicate-client-logo'] },
  { title: 'Gallery', to: ['/gallery/gallery-list', '/gallery/add-gallery', '/gallery/edit-gallery', '/gallery/duplicate-gallery'] },
  { title: 'Partner Logo', to: ['/partner-logo/partner-logo-list', '/partner-logo/add-partner-logo', '/partner-logo/edit-partner-logo', '/partner-logo/duplicate-partner-logo'] }
];

export const filesPath = [{ title: 'Files', to: ['/files/file-list', '/files/add-file', '/files/edit-file', '/files/duplicate-file'] }];

export const eventsPath = [
  { title: 'Events', to: ['/events/event-list', '/events/add-event', '/events/edit-event', '/events/duplicate-event', '/events/view-event'] },
  { title: 'Participants', to: ['/participants/participant-list'] },
  { title: 'Packages', to: ['/packages/package-list', '/packages/add-package', '/packages/edit-package', '/packages/duplicate-package'] },
  { title: 'Tickets', to: ['/tickets/ticket-list', '/tickets/add-ticket', '/tickets/edit-ticket'] },
  { title: 'Booking Payments', to: ['/payments/booking-payment-list'] }
];

export const afterSalesPath = [
  { title: 'Event Default Settings', to: ['/after-sales/event-default-settings'] },
  { title: 'After Sales', to: ['/after-sales/after-sales-list', '/after-sales/add-after-sales', '/after-sales/edit-after-sales', '/after-sales/duplicate-after-sales'] }
];

export const faqsPath = [
  { title: 'FAQs', to: ['/faq/faq-list', '/faq/add-faq', '/faq/edit-faq', '/faq/duplicate-faq'] },
  { title: 'FAQ Categories', to: ['/faq-category/faq-category-list', '/faq-category/add-faq-category', '/faq-category/edit-faq-category'] }
];

export const testimonialsPath = [
  { title: 'Testimonials', to: ['/testimonials/testimonial-list', '/testimonials/add-testimonial', '/testimonials/edit-testimonial', '/testimonials/duplicate-testimonial'] },
  {
    title: 'Testimonial Categories',
    to: ['/testimonial-category/testimonial-category-list', '/testimonial-category/add-testimonial-category', '/testimonial-category/edit-testimonial-category']
  }
];

export const templatePath = [
  { title: 'Email Templates', to: ['/templates/email-template-list', '/templates/add-email-template', '/templates/edit-email-template'] },
  { title: 'SMS Templates', to: ['/templates/sms-template-list', '/templates/add-sms-template', '/templates/edit-sms-template'] },
  { title: 'WhatsApp Templates', to: ['/templates/whatsapp-template-list', '/templates/add-whatsapp-template', '/templates/edit-whatsapp-template'] }
];

export const adminNavLinks = [{ title: 'Admins', to: ['/admin/admin-list', '/admin/add-admin', '/admin/edit-admin'], icon: <RiAdminLine /> }];
