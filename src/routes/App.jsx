import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { authReducer, authState, GlobalContext } from '../contexts/GlobalContext';
import { useReducer, useState } from 'react';
import { ToastContainer } from 'react-toastify';
import FullScreenLoader from '../atoms/common/FullScreenLoader';
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
import MailingListRoutes from './private-routes/MailingListRoutes';
import FeedbackRoutes from './private-routes/FeedbackRoutes';
import SiteRoutes from './private-routes/SiteRoutes';
import PopupRoutes from './private-routes/PopupRoutes';
import ClientLogoRoutes from './private-routes/ClientLogoRoutes';
import GalleryRoutes from './private-routes/GalleryRoutes';
import PartnerLoogoRoutes from './private-routes/PartnerLogoRoutes';
import PageNotFound from '../pages/common/PageNotFound';
import 'react-toastify/dist/ReactToastify.css';
import CouponRoutes from './private-routes/CouponRoutes';
import ParticipantRoutes from './private-routes/ParticipantRoutes';
import EventRoutes from './private-routes/EventRoutes';
import PaymentRoutes from './private-routes/PaymentRoutes';
import IntegrationRoutes from './private-routes/IntegrationRoutes';

function App() {
  const [isLoading, setLoading] = useState(false);
  const [auth, dispatch] = useReducer(authReducer, authState);
  return (
    <>
      <div className="w-screen inter-unique overflow-x-hidden">
        <GlobalContext.Provider value={{ auth, dispatch, setLoading }}>
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

                  {/* Nested Private Routes */}
                  <Route path="/admin/*" element={<AdminRoutes />} />
                  <Route path="/smtp/*" element={<SmtpRoutes />} />
                  <Route path="/case-study/*" element={<CaseStudyRoutes />} />
                  <Route path="/guides/*" element={<GuidesRoutes />} />
                  <Route path="/testimonials/*" element={<TestimonialRoutes />} />
                  <Route path="/recaptcha/*" element={<RecaptchaRoutes />} />
                  <Route path="/faq/*" element={<FaqRoutes />} />
                  <Route path="/enquiry/*" element={<EnquiryRoutes />} />
                  <Route path="/mailing/*" element={<MailingListRoutes />} />
                  <Route path="/feedback/*" element={<FeedbackRoutes />} />
                  <Route path="/website/*" element={<SiteRoutes />} />
                  <Route path="/pop-up/*" element={<PopupRoutes />} />
                  <Route path="/client-logo/*" element={<ClientLogoRoutes />} />
                  <Route path="/gallery/*" element={<GalleryRoutes />} />
                  <Route path="/partner-logo/*" element={<PartnerLoogoRoutes />} />
                  <Route path="/coupon/*" element={<CouponRoutes />} />
                  <Route path="/participants/*" element={<ParticipantRoutes />} />
                  <Route path="/events/*" element={<EventRoutes />} />
                  <Route path="/payments/*" element={<PaymentRoutes />} />
                  <Route path="/apps/*" element={<IntegrationRoutes />} />
                </Route>
              </Route>
              <Route path="*" element={<PageNotFound />} />
            </Routes>
          </BrowserRouter>
          <ToastContainer />
          {isLoading && <FullScreenLoader />}
        </GlobalContext.Provider>
      </div>
    </>
  );
}

export default App;
