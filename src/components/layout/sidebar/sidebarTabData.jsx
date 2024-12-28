import { RxDashboard } from 'react-icons/rx';

export const navLinks = [{ title: 'Dashboard', to: ['/dashboard'], icon: <RxDashboard /> }];

export const enquiresPaths = [
  { title: 'Enquiry', to: ['/enquiry/enquiry-list', '/enquiry/view-enquiry', '/enquiry/enquiry-integration'] },
  { title: 'Mailing List', to: ['/mailing/mailing-list', '/mailing/view-mailing', '/mailing/mailing-integration'] },
  { title: 'Feedback', to: ['/feedback/feedback-list', '/feedback/view-feedback', '/feedback/feedback-integration'] }
];

export const features = [
  { title: 'Guides', to: ['/guides/guides-list', '/guides/add-guides', '/guides/edit-guides', '/guides/guides-integration'] },
  { title: 'Case Studies', to: ['/case-study/case-study-list', '/case-study/add-case-study', '/case-study/edit-case-study', '/case-study/case-study-integration'] },
  { title: 'Testimonials', to: ['/testimonials/testimonial-list', '/testimonials/add-testimonial', '/testimonials/edit-testimonial'] },
  { title: 'Testimonial Categories', to: ['/testimonials/testimonial-category-list', '/testimonials/add-testimonial-category', '/testimonials/edit-testimonial-category'] }
];

export const essentials = [
  { title: 'Pop-up', to: ['/pop-up/pop-up-list', '/pop-up/add-pop-up', '/pop-up/edit-pop-up'] },
  { title: 'Website', to: ['/website/website-list', '/website/add-website', '/website/edit-website'] },
  { title: 'Apps', to: ['/apps/app', '/apps/integration/razorpay', '/apps/integration/stripe', '/apps/integration/paypal'] }
];

export const admin = [
  { title: 'Admin', to: ['/admin/admin-list', '/admin/add-admin', '/admin/edit-admin'] },
  { title: "SMTP's", to: ['/smtp/smtp-list', '/smtp/add-smtp', '/smtp/edit-smtp'] },
  { title: 'reCAPTCHA', to: ['/recaptcha/recaptcha-list', '/recaptcha/add-recaptcha', '/recaptcha/edit-recaptcha'] },
  { title: 'Coupon', to: ['/coupon/coupon-list', '/coupon/add-coupon', '/coupon/edit-coupon'] }
];

export const support = [
  { title: 'FAQ Categories', to: ['/faq-category/faq-category-list', '/faq-category/add-faq-category', '/faq-category/edit-faq-category'] },
  { title: 'FAQ', to: ['/faq/faq-list', '/faq/add-faq', '/faq/edit-faq'] }
];

export const addOns = [
  { title: 'Client Logo', to: ['/client-logo/client-logo-list', '/client-logo/add-client-logo', '/client-logo/edit-client-logo'] },
  { title: 'Gallery', to: ['/gallery/gallery-list', '/gallery/add-gallery', '/gallery/edit-gallery'] },
  { title: 'Partner Logo', to: ['/partner-logo/partner-logo-list', '/partner-logo/add-partner-logo', '/partner-logo/edit-partner-logo'] },
  { title: 'Participants', to: ['/participants/participant-list'] },
  { title: 'Events', to: ['/events/event-list', '/events/add-event', '/events/edit-event'] },
  { title: 'Payments', to: ['/payments/payment-list'] }
];
