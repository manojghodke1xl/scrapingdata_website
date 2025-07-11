import { lazy, Suspense } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import { GlobalProvider } from '../contexts/providers/GlobalProvider';
import { ColorProvider } from '../contexts/providers/ColorProvider';
import { LayoutProvider } from '../contexts/providers/LayoutProvider';
import DeAuthComponent from '../components/authentication/DeAuthComponent';
import Login from '../pages/authentication/Login';
import AuthComponent from '../components/authentication/AuthComponent';
import StructuredLayout from '../layouts/StructuredLayout';
import Dashboard from '../pages/common/Dashboard';
import PageNotFound from '../pages/common/PageNotFound';

import AdminRoutes from './private-routes/AdminRoutes';
import SmtpRoutes from './private-routes/SmtpRoutes';
import CaseStudyRoutes from './private-routes/CaseStudyRoutes';
import GuidesRoutes from './private-routes/GuidesRoutes';
import TestimonialRoutes from './private-routes/TestimonialRoutes';
import TestimonialCategoryRoutes from './private-routes/TestimonialCategoryRoutes';
import RecaptchaRoutes from './private-routes/RecaptchaRoutes';
import FaqRoutes from './private-routes/FaqRoutes';
import FaqCategoryRoutes from './private-routes/FaqCategoryRoutes';
import EnquiryRoutes from './private-routes/EnquiryRoutes';
import SubscribersRoutes from './private-routes/SubscribersRoutes';
import FeedbackRoutes from './private-routes/FeedbackRoutes';
import SiteRoutes from './private-routes/SiteRoutes';
import PopupRoutes from './private-routes/PopupRoutes';
import ClientLogoRoutes from './private-routes/ClientLogoRoutes';
import GalleryRoutes from './private-routes/GalleryRoutes';
import PartnerLogoRoutes from './private-routes/PartnerLogoRoutes';
import CouponRoutes from './private-routes/CouponRoutes';
import ParticipantRoutes from './private-routes/ParticipantRoutes';
import EventRoutes from './private-routes/EventRoutes';
import BookingRoutes from './private-routes/BookingRoutes';
import PaymentRoutes from './private-routes/PaymentRoutes';
import IntegrationRoutes from './private-routes/IntegrationRoutes';
import PackageRoutes from './private-routes/PackageRoutes';
import ProductRoutes from './private-routes/ProductRoutes';
import OrderRoutes from './private-routes/OrderRoutes';
import TemplateRoutes from './private-routes/template/TemplateRoutes';
import TemplateCategoryRoutes from './private-routes/template/TemplateCategoryRoutes';
import FilesRoutes from './private-routes/FilesRoutes';
import EventTicketRoutes from './private-routes/EventTicketRoutes';
import AfterSalesRoutes from './private-routes/AfterSalesRoutes';
import SegmentRoutes from './private-routes/SegmentRoutes';
import CertificateRoutes from './private-routes/CertificateRoutes';
import ReminderRoutes from './private-routes/ReminderRoutes';
import LogRoutes from './private-routes/LogRoutes';
import AdvertisementRoutes from './private-routes/leads/AdvertisementRoutes';
import VendorRoutes from './private-routes/leads/VendorRoutes';
import DistributorRoutes from './private-routes/leads/DistributorRoutes';
import ResellerRoutes from './private-routes/leads/ResellerRoutes';
import AffiliateRoutes from './private-routes/leads/AffiliateRoutes';
import FanClubRoutes from './private-routes/leads/FanClubRoutes';
import CareerRoutes from './private-routes/leads/CareerRoutes';
import WebinarRoutes from './private-routes/WebinarRoutes';
import UTMBuilderRoutes from './private-routes/UTMBuilderRoutes';
import BroadcastRoutes from './private-routes/BroadcastRoutes';
import NotifAgentRoutes from './private-routes/NotifAgentRoutes';
import TaskRoutes from './private-routes/taskRoutes';
import Layout_SEO from '../layouts/LayoutSeo';
import ContactRoutes from './private-routes/ContactRoutes';
import CampaignRoutes from './private-routes/CampaignRoutes';
import MetaDataRoutes from './private-routes/MetaDataRoutes';

const ZohoStatus = lazy(() => import('../pages/integration/ZohoStatus'));

// Combining all private routes into one array
const privateRoutes = [
  ...WebinarRoutes,
  ...UTMBuilderRoutes,
  ...TestimonialRoutes,
  ...TestimonialCategoryRoutes,
  ...TaskRoutes,
  ...SubscribersRoutes,
  ...SmtpRoutes,
  ...SiteRoutes,
  ...SegmentRoutes,
  ...ReminderRoutes,
  ...RecaptchaRoutes,
  ...ProductRoutes,
  ...PopupRoutes,
  ...PaymentRoutes,
  ...PartnerLogoRoutes,
  ...ParticipantRoutes,
  ...PackageRoutes,
  ...OrderRoutes,
  ...NotifAgentRoutes,
  ...LogRoutes,
  ...IntegrationRoutes,
  ...GuidesRoutes,
  ...GalleryRoutes,
  ...FilesRoutes,
  ...FeedbackRoutes,
  ...FaqRoutes,
  ...FaqCategoryRoutes,
  ...EventTicketRoutes,
  ...EventRoutes,
  ...EnquiryRoutes,
  ...CouponRoutes,
  ...ContactRoutes,
  ...ClientLogoRoutes,
  ...CertificateRoutes,
  ...CaseStudyRoutes,
  ...BroadcastRoutes,
  ...CampaignRoutes,
  ...BookingRoutes,
  ...AfterSalesRoutes,
  ...AdminRoutes,
  ...TemplateRoutes,
  ...TemplateCategoryRoutes,
  ...VendorRoutes,
  ...ResellerRoutes,
  ...FanClubRoutes,
  ...DistributorRoutes,
  ...CareerRoutes,
  ...AffiliateRoutes,
  ...AdvertisementRoutes,
  ...MetaDataRoutes
];

const App = () => {
  return (
    <GlobalProvider>
      <LayoutProvider>
        <ColorProvider>
          <div className="w-screen inter-unique overflow-x-hidden">
            <BrowserRouter>
              <Layout_SEO>
                <Suspense fallback={<></>}>
                  <Routes>
                    {/* Public Routes */}
                    <Route element={<DeAuthComponent />}>
                      <Route path="/" element={<Login />} />
                    </Route>

                    <Route element={<AuthComponent />}>
                      <Route element={<StructuredLayout />}>
                        <Route path="/dashboard" element={<Dashboard />} />
                        <Route path="/auth-status/:id" element={<ZohoStatus />} />
                        {privateRoutes.map(({ path, Component }) => (
                          <Route key={path} path={`/${path}`} element={<Component />} />
                        ))}
                      </Route>
                    </Route>

                    <Route path="*" element={<PageNotFound />} />
                  </Routes>
                </Suspense>
              </Layout_SEO>
            </BrowserRouter>
            <ToastContainer />
          </div>
        </ColorProvider>
      </LayoutProvider>
    </GlobalProvider>
  );
};

export default App;
