import { RiAdminLine, RiBroadcastLine, RiContactsLine, RiNotificationBadgeLine, RiTaskLine } from 'react-icons/ri';
import { RxDashboard } from 'react-icons/rx';
import { TbApps, TbWorld } from 'react-icons/tb';

// Main navigation links that appear at the top of the sidebar
export const navLinks = [
  { title: 'Dashboard', to: ['/dashboard'], icon: <RxDashboard /> },
  {
    title: 'Apps',
    to: ['/apps/app', '/apps/integration/razorpay', '/apps/integration/stripe', '/apps/integration/paypal'],
    icon: <TbApps />
  },
  { title: 'All Sites', to: ['/site/site-list', '/site/add-site', '/site/edit-site'], icon: <TbWorld /> }
  // { title: 'All Segments', to: ['/segments/segment-list', '/segments/add-segment', '/segments/edit-segment'], icon: <TbCube /> }
];

// Lead management related navigation paths
export const leadsPath = [
  { title: 'Enquiry', to: ['/enquiry/enquiry-list', '/enquiry/view-enquiry', '/enquiry/enquiry-integration', '/enquiry/add-enquiry'] },
  {
    title: 'Newsletter Subscribers',
    to: ['/subscriber/subscriber-list', '/subscriber/view-subscriber', '/subscriber/subscriber-integration', '/subscriber/add-subscriber']
  },
  { title: 'Feedbacks', to: ['/feedback/feedback-list', '/feedback/view-feedback', '/feedback/feedback-integration', '/feedback/add-feedback'] },
  {
    title: 'Advertisements',
    to: ['/advertisement/advertisement-list', '/advertisement/add-advertisement', '/advertisement/advertisement-integration', '/advertisement/view-advertisement']
  },
  { title: 'Vendors', to: ['/vendor/vendor-list', '/vendor/add-vendor', '/vendor/view-vendor', '/vendor/vendor-integration'] },
  {
    title: 'Distributors',
    to: ['/distributor/distributor-list', '/distributor/add-distributor', '/distributor/view-distributor', '/distributor/distributor-integration']
  },
  { title: 'Resellers', to: ['/reseller/reseller-list', '/reseller/add-reseller', '/reseller/view-reseller', '/reseller/reseller-integration'] },
  {
    title: 'Affiliates',
    to: ['/affiliate/affiliate-list', '/affiliate/add-affiliate', '/affiliate/view-affiliate', '/affiliate/affiliate-integration']
  },
  { title: 'Fan Clubs', to: ['/fan-club/fan-club-list', '/fan-club/add-fan-club', '/fan-club/view-fan-club', '/fan-club/fan-club-integration'] },
  { title: 'Career', to: ['/career/career-list', '/career/add-career', '/career/view-career', '/career/career-integration'] }
];

// Content management related navigation paths
export const contentsPath = [
  {
    title: 'Case Studies',
    to: ['/case-study/case-study-list', '/case-study/add-case-study', '/case-study/edit-case-study', '/case-study/case-study-integration', '/case-study/duplicate-case-study']
  },
  { title: 'Guides', to: ['/guides/guides-list', '/guides/add-guide', '/guides/edit-guide', '/guides/guides-integration', '/guides/duplicate-guide'] },
  { title: 'Pop-ups', to: ['/pop-up/pop-up-list', '/pop-up/add-pop-up', '/pop-up/edit-pop-up', '/pop-up/pop-up-integration', '/pop-up/duplicate-pop-up'] }
];

// Marketing related navigation paths
export const marketingPath = [{ title: 'Coupons', to: ['/coupon/coupon-list', '/coupon/add-coupon', '/coupon/edit-coupon', '/coupon/duplicate-coupon'] }];

// Product management related navigation paths
export const productsPath = [
  { title: 'Products', to: ['/products/product-list', '/products/add-product', '/products/edit-product', '/products/duplicate-product'] },
  { title: 'Order Payments', to: ['/payments/order-payment-list', '/payments/view-order'] }
];

// Site configuration and settings related paths
export const siteSettingsPath = [
  { title: 'Admin Settings', to: ['/admin/admin-settings'] },
  { title: 'SMTP Settings', to: ['/smtp/smtp-list', '/smtp/add-smtp', '/smtp/edit-smtp', '/smtp/duplicate-smtp'] },
  { title: 'reCAPTCHA Settings', to: ['/recaptcha/recaptcha-list', '/recaptcha/add-recaptcha', '/recaptcha/edit-recaptcha', '/recaptcha/duplicate-recaptcha'] },
  { title: 'Site Notifications', to: ['/site/site-settings'] }
];

// Media assets management paths
export const mediaPath = [
  { title: 'Client Logos', to: ['/client-logo/client-logo-list', '/client-logo/add-client-logo', '/client-logo/edit-client-logo', '/client-logo/duplicate-client-logo'] },
  { title: 'Gallery', to: ['/gallery/gallery-list', '/gallery/add-gallery', '/gallery/edit-gallery', '/gallery/duplicate-gallery'] },
  { title: 'Partner Logos', to: ['/partner-logo/partner-logo-list', '/partner-logo/add-partner-logo', '/partner-logo/edit-partner-logo', '/partner-logo/duplicate-partner-logo'] }
];

// File management related paths
export const filesPath = [{ title: 'Files', to: ['/files/file-list', '/files/add-file', '/files/edit-file', '/files/duplicate-file'] }];

// Event management related paths
export const eventsPath = [
  { title: 'Events', to: ['/events/event-list', '/events/add-event', '/events/edit-event', '/events/duplicate-event', '/events/view-event'] },
  {
    title: 'Participants',
    to: [
      '/participants/participant-list',
      '/participants/add-participant',
      '/participants/edit-participant',
      '/participants/duplicate-participant',
      '/participants/import-participants'
    ]
  },
  { title: 'Packages', to: ['/packages/package-list', '/packages/add-package', '/packages/edit-package', '/packages/duplicate-package'] },
  { title: 'Tickets', to: ['/tickets/ticket-list', '/tickets/add-ticket', '/tickets/edit-ticket'] },
  { title: 'Booking Payments', to: ['/payments/booking-payment-list'] },
  { title: 'Certificates', to: ['/certificates/certificate-list', '/certificates/add-certificate', '/certificates/edit-certificate', '/certificates/duplicate-certificate'] }
];

// After-sales and customer follow-up related paths
export const afterSalesPath = [
  { title: 'Event Default Settings', to: ['/after-sales/event-default-settings'] },
  { title: 'After Sales', to: ['/after-sales/after-sales-list', '/after-sales/add-after-sale', '/after-sales/edit-after-sale', '/after-sales/duplicate-after-sale'] },
  { title: 'Reminders', to: ['/reminder/reminder-list', '/reminder/add-reminder', '/reminder/edit-reminder', '/reminder/duplicate-reminder'] },
  { title: 'Broadcast', to: ['/broadcast/broadcast-list', '/broadcast/add-broadcast', '/broadcast/edit-broadcast', '/broadcast/duplicate-broadcast'] }
];

// FAQ management related paths
export const faqsPath = [
  { title: 'FAQs', to: ['/faq/faq-list', '/faq/add-faq', '/faq/edit-faq', '/faq/duplicate-faq'] },
  { title: 'FAQ Categories', to: ['/faq-category/faq-category-list', '/faq-category/add-faq-category', '/faq-category/edit-faq-category'] }
];

// Testimonials management related paths
export const testimonialsPath = [
  { title: 'Testimonials', to: ['/testimonials/testimonial-list', '/testimonials/add-testimonial', '/testimonials/edit-testimonial', '/testimonials/duplicate-testimonial'] },
  {
    title: 'Testimonial Categories',
    to: ['/testimonial-category/testimonial-category-list', '/testimonial-category/add-testimonial-category', '/testimonial-category/edit-testimonial-category']
  }
];

// Communication templates related paths
export const templatePath = [
  { title: 'Email Templates', to: ['/templates/email-template-list', '/templates/add-email-template', '/templates/edit-email-template', '/templates/duplicate-email-template'] },
  { title: 'SMS Templates', to: ['/templates/sms-template-list', '/templates/add-sms-template', '/templates/edit-sms-template', '/templates/duplicate-sms-template'] },
  {
    title: 'WhatsApp Templates',
    to: ['/templates/whatsapp-template-list', '/templates/add-whatsapp-template', '/templates/edit-whatsapp-template', '/templates/duplicate-whatsapp-template']
  }
];

// System logs and tracking related paths
export const logsPath = [
  { title: 'Whatsapp Logs', to: ['/logs/whatsapp-log-list', '/logs/whatsapp-log-preview'] },
  { title: 'Email Logs', to: ['/logs/email-log-list', '/logs/email-log-preview'] },
  { title: 'SMS Logs', to: ['/logs/sms-log-list'] }
];

// Administrative user management paths
export const adminNavLinks = [
  { title: 'Campaign', to: ['/campaign/campaign-list', '/campaign/add-campaign', '/campaign/edit-campaign', '/campaign/duplicate-campaign'], icon: <RiBroadcastLine /> },
  { title: 'Admins', to: ['/admin/admin-list', '/admin/add-admin', '/admin/edit-admin'], icon: <RiAdminLine /> },
  { title: 'Contacts', to: ['/contact/contact-list', '/contact/add-contact', '/contact/edit-contact', '/contact/import-contacts'], icon: <RiContactsLine /> },
  {
    title: 'Notification Agents',
    to: [
      '/notification-agent/notification-agent-list',
      '/notification-agent/add-notification-agent',
      '/notification-agent/edit-notification-agent',
      '/notification-agent/duplicate-notification-agent'
    ],
    icon: <RiNotificationBadgeLine />
  },
  {
    title: 'Tasks',
    to: ['/task/task-list'],
    icon: <RiTaskLine />
  }
];

// Webinar management related paths
export const webinarsPath = [
  { title: 'Webinars', to: ['/webinar/webinar-list', '/webinar/add-webinar', '/webinar/edit-webinar', '/webinar/duplicate-webinar'] },
  { title: 'Webinar Links', to: ['/webinar/webinar-link'] }
];

// Utility tools related paths
export const utilitiesPath = [
  { title: 'UTM Builder', to: ['/utm-builder/utm-builder-list', '/utm-builder/add-utm-builder', '/utm-builder/edit-utm-builder', '/utm-builder/duplicate-utm-builder'] }
];
