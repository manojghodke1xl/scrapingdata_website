import { lazy } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import { GlobalProvider } from '../contexts/providers/GlobalProvider';
import DeAuthComponent from '../components/authentication/DeAuthComponent';
import Login from '../pages/authentication/Login';
import AuthComponent from '../components/authentication/AuthComponent';
import StructuredLayout from '../layouts/StructuredLayout';
import Dashboard from '../pages/common/Dashboard';
import AdminRoutes from './private-routes/AdminRoutes';
import SmtpRoutes from './private-routes/SmtpRoutes';
import CaseStudyRoutes from './private-routes/CaseStudyRoutes';
import GuidesRoutes from './private-routes/GuidesRoutes';
import TestimonialRoutes from './private-routes/TestimonialRoutes';
import RecaptchaRoutes from './private-routes/RecaptchaRoutes';
import FaqRoutes from './private-routes/FaqRoutes';
import EnquiryRoutes from './private-routes/EnquiryRoutes';
import SubscribersRoutes from './private-routes/SubscribersRoutes';
import FeedbackRoutes from './private-routes/FeedbackRoutes';
import SiteRoutes from './private-routes/SiteRoutes';
import PopupRoutes from './private-routes/PopupRoutes';
import ClientLogoRoutes from './private-routes/ClientLogoRoutes';
import GalleryRoutes from './private-routes/GalleryRoutes';
import PartnerLoogoRoutes from './private-routes/PartnerLogoRoutes';
import PageNotFound from '../pages/common/PageNotFound';
import CouponRoutes from './private-routes/CouponRoutes';
import ParticipantRoutes from './private-routes/ParticipantRoutes';
import EventRoutes from './private-routes/EventRoutes';
import PaymentRoutes from './private-routes/PaymentRoutes';
import IntegrationRoutes from './private-routes/IntegrationRoutes';
import FaqCategoryRoutes from './private-routes/FaqCategoryRoutes';
import 'react-toastify/dist/ReactToastify.css';
import PackageRoutes from './private-routes/PackageRoutes';
import TestimonialCategoryRoutes from './private-routes/TestimonialCategoryRoutes';

const ZohoStatus = lazy(() => import('../pages/integration/ZohoStatus'));

const App = () => {
  return (
    <GlobalProvider>
      <div className="w-screen inter-unique overflow-x-hidden">
        <BrowserRouter>
          <Routes>
            {/* Public Routes */}
            <Route element={<DeAuthComponent />}>
              <Route path="/" element={<Login />} />
            </Route>

            {/* Protected Routes */}
            <Route element={<AuthComponent />}>
              <Route element={<StructuredLayout />}>
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/auth-status/:id" element={<ZohoStatus />} />

                {/* Nested Private Routes */}
                <Route path="/admin/*" element={<AdminRoutes />} />
                <Route path="/smtp/*" element={<SmtpRoutes />} />
                <Route path="/case-study/*" element={<CaseStudyRoutes />} />
                <Route path="/guides/*" element={<GuidesRoutes />} />
                <Route path="/testimonials/*" element={<TestimonialRoutes />} />
                <Route path="/testimonial-category/*" element={<TestimonialCategoryRoutes />} />
                <Route path="/recaptcha/*" element={<RecaptchaRoutes />} />
                <Route path="/faq/*" element={<FaqRoutes />} />
                <Route path="/faq-category/*" element={<FaqCategoryRoutes />} />
                <Route path="/enquiry/*" element={<EnquiryRoutes />} />
                <Route path="/subscriber/*" element={<SubscribersRoutes />} />
                <Route path="/feedback/*" element={<FeedbackRoutes />} />
                <Route path="/site/*" element={<SiteRoutes />} />
                <Route path="/pop-up/*" element={<PopupRoutes />} />
                <Route path="/client-logo/*" element={<ClientLogoRoutes />} />
                <Route path="/gallery/*" element={<GalleryRoutes />} />
                <Route path="/partner-logo/*" element={<PartnerLoogoRoutes />} />
                <Route path="/coupon/*" element={<CouponRoutes />} />
                <Route path="/participants/*" element={<ParticipantRoutes />} />
                <Route path="/events/*" element={<EventRoutes />} />
                <Route path="/payments/*" element={<PaymentRoutes />} />
                <Route path="/apps/*" element={<IntegrationRoutes />} />
                <Route path="/packages/*" element={<PackageRoutes />} />
              </Route>
            </Route>
            <Route path="*" element={<PageNotFound />} />
          </Routes>
        </BrowserRouter>
        <ToastContainer />
      </div>
    </GlobalProvider>
  );
};

export default App;
