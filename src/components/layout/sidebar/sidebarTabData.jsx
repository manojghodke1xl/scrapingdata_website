import { RiAdminLine } from 'react-icons/ri';
import { RxDashboard } from 'react-icons/rx';
import { TbApps, TbWorld } from 'react-icons/tb';
import { VscCreditCard } from 'react-icons/vsc';

export const navLinks = [
  { title: 'Dashboard', to: ['/dashboard'], icon: <RxDashboard /> },
  {
    title: 'Apps',
    to: ['/apps/app', '/apps/integration/razorpay', '/apps/integration/stripe', '/apps/integration/paypal'],
    icon: <TbApps />
  },
  { title: 'All Sites', to: ['/site/site-list', '/site/add-site', '/site/edit-site'], icon: <TbWorld /> }
];

export const leadsManagementPath = [
  { title: 'Enquiry', to: ['/enquiry/enquiry-list', '/enquiry/view-enquiry', '/enquiry/enquiry-integration'] },
  { title: 'Subscribers', to: ['/subscriber/subscriber-list', '/subscriber/view-subscriber', '/subscriber/subscriber-integration'] },
  { title: 'Feedback', to: ['/feedback/feedback-list', '/feedback/view-feedback', '/feedback/feedback-integration'] }
];

export const contentManagementPath = [
  {
    title: 'Case Study',
    to: ['/case-study/case-study-list', '/case-study/add-case-study', '/case-study/edit-case-study', '/case-study/case-study-integration', '/case-study/duplicate-case-study']
  },
  { title: 'Guides', to: ['/guides/guides-list', '/guides/add-guide', '/guides/edit-guide', '/guides/guides-integration', '/guides/duplicate-guide'] },
  { title: 'Pop-up', to: ['/pop-up/pop-up-list', '/pop-up/add-pop-up', '/pop-up/edit-pop-up'] }
];

export const marketingManagementPath = [{ title: 'Coupon Management', to: ['/coupon/coupon-list', '/coupon/add-coupon', '/coupon/edit-coupon', '/coupon/duplicate-coupon'] }];

export const productManagementPath = [
  { title: 'Product Management', to: ['/products/product-list', '/products/add-product', '/products/edit-product', '/products/duplicate-product'] }
];

export const siteSettingsPath = [
  { title: 'SMTP Settings', to: ['/smtp/smtp-list', '/smtp/add-smtp', '/smtp/edit-smtp'] },
  { title: 'reCAPTCHA Settings', to: ['/recaptcha/recaptcha-list', '/recaptcha/add-recaptcha', '/recaptcha/edit-recaptcha', '/recaptcha/duplicate-recaptcha'] }
];

export const mediaManagementPath = [
  { title: 'Client Logo', to: ['/client-logo/client-logo-list', '/client-logo/add-client-logo', '/client-logo/edit-client-logo', '/client-logo/duplicate-client-logo'] },
  { title: 'Gallery', to: ['/gallery/gallery-list', '/gallery/add-gallery', '/gallery/edit-gallery', '/gallery/duplicate-gallery'] },
  { title: 'Partner Logo', to: ['/partner-logo/partner-logo-list', '/partner-logo/add-partner-logo', '/partner-logo/edit-partner-logo', '/partner-logo/duplicate-partner-logo'] }
];

export const eventManagementPath = [
  { title: 'Events', to: ['/events/event-list', '/events/add-event', '/events/edit-event', '/events/duplicate-event', '/events/view-event'] },
  { title: 'Participants', to: ['/participants/participant-list'] },
  { title: 'Packages', to: ['/packages/package-list', '/packages/add-package', '/packages/edit-package', '/packages/duplicate-package'] }
];

export const faqManagementPath = [
  { title: 'FAQ Categories', to: ['/faq-category/faq-category-list', '/faq-category/add-faq-category', '/faq-category/edit-faq-category'] },
  { title: 'FAQ', to: ['/faq/faq-list', '/faq/add-faq', '/faq/edit-faq', '/faq/duplicate-faq'] }
];

export const testimonialsPath = [
  { title: 'Testimonials', to: ['/testimonials/testimonial-list', '/testimonials/add-testimonial', '/testimonials/edit-testimonial', '/testimonials/duplicate-testimonial'] },
  {
    title: 'Testimonial Categories',
    to: ['/testimonial-category/testimonial-category-list', '/testimonial-category/add-testimonial-category', '/testimonial-category/edit-testimonial-category']
  }
];

export const adminNavLinks = [
  { title: 'Payments', to: ['/payments/payment-list', '/payments/payment-integration'], icon: <VscCreditCard /> },
  { title: 'Admin Management', to: ['/admin/admin-list', '/admin/add-admin', '/admin/edit-admin'], icon: <RiAdminLine /> }
];
