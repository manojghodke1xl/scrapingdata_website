import { useReducer, useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AlertContainer } from "./comps/alert";
import { useAlert } from "./Hooks/useAlerts";
import { authReducer, authState, GlobalContext } from "./GlobalContext";
import Auth from "./comps/auth";
import DeAuth from "./comps/deauth";
import Home from "./pages/home";
import Missing from "./pages/missing";
import Loading from "./comps/loading";
import Signin from "./pages/signin";
import Layout from "./comps/layout";
import Dashboard from "./pages/dashboard";
import EnquiryList from "./pages/enquiry/enquirylist";
import Enquirysingle from "./pages/enquiry/enquirysingle";
import MailingList from "./pages/mailing/mailinglist";
import MailingSingle from "./pages/mailing/mailingsingle";
import SiteList from "./pages/site/sitelist";
import AdminList from "./pages/admin/adminlist";
import AddAdmin from "./pages/admin/addadmin";
import AddSite from "./pages/site/addsite";
import GuideList from "./pages/guide/guidelist";
import AddGuide from "./pages/guide/addguide";
import CaseStudyList from "./pages/casestudy/casestudylist";
import AddCaseStudy from "./pages/casestudy/addcasestudy";
import TestimonialList from "./pages/testimonial/testimoniallist";
import AddTestimonial from "./pages/testimonial/addtestimonial";
import SmtpList from "./pages/smtp/smtplist";
import AddSmtp from "./pages/smtp/addsmtp";
import PopupList from "./pages/popup/popuplist";
import AddPopup from "./pages/popup/addpopup";
import CategoryList from "./pages/category/categoryList";
import AddCategory from "./pages/category/addCategory";
import AddGallery from "./pages/gallery/addgallery";
import GalleryList from "./pages/gallery/gallerylist";
import AddClientLogo from "./pages/clientlogo/addclientlogo";
import ClientLogoList from "./pages/clientlogo/clientlogolist";
import PartnerLogoList from "./pages/partnerlogo/partnerlogolist";
import AddPartnerLogo from "./pages/partnerlogo/addpartnerlogo";
import ZohoAuth from "./pages/zohoCRM/zohoAuth";
import ZohoStatus from "./pages/zohoCRM/status";
import FaqCategoryList from "./pages/faqCategory/faqCategoryList";
import AddFaqCategory from "./pages/faqCategory/addFaqCategory";
import FaqList from "./pages/faq/faqList";
import AddFaq from "./pages/faq/addFaq";
import FeedbackList from "./pages/feedback/feedbackList";
import FeedbackSingle from "./pages/feedback/feedbacksingle";
import RecaptchaList from "./pages/recaptcha/recaptchaList";
import AddRecaptcha from "./pages/recaptcha/addRecaptcha";
import CouponList from "./pages/coupon/CouponList";
import AddCoupon from "./pages/coupon/AddCoupon";

function App() {
  const [alerts, alert] = useAlert();
  const [isLoading, setLoading] = useState(false);
  const [auth, dispatch] = useReducer(authReducer, authState);

  return (
    <GlobalContext.Provider value={{ auth, dispatch, setLoading, alert }}>
      <BrowserRouter>
        <Routes>
          <Route element={<Layout />}>
            <Route element={<DeAuth />}>
              <Route path="/" element={<Home />} />
              <Route path="/signin" element={<Signin />} />
            </Route>

            <Route element={<Auth />}>
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/enquiry-list" element={<EnquiryList />} />
              <Route path="/enquiry/:id" element={<Enquirysingle />} />
              <Route path="/mailing-list" element={<MailingList />} />
              <Route path="/mailing/:id" element={<MailingSingle />} />
              <Route path="/site-list" element={<SiteList />} />
              <Route path="/admin-list" element={<AdminList />} />
              <Route path="/add-admin" element={<AddAdmin />} />
              <Route path="/edit-admin/:id" element={<AddAdmin />} />
              <Route path="/add-site" element={<AddSite />} />
              <Route path="/edit-site/:id" element={<AddSite />} />
              <Route path="/guide-list" element={<GuideList />} />
              <Route path="/add-guide" element={<AddGuide />} />
              <Route path="/edit-guide/:id" element={<AddGuide />} />
              <Route path="/casestudy-list" element={<CaseStudyList />} />
              <Route path="/add-casestudy" element={<AddCaseStudy />} />
              <Route path="/edit-casestudy/:id" element={<AddCaseStudy />} />
              <Route path="/testimonial-list" element={<TestimonialList />} />
              <Route path="/add-testimonial" element={<AddTestimonial />} />
              <Route path="/edit-testimonial/:id" element={<AddTestimonial />} />
              <Route path="/smtp-list" element={<SmtpList />} />
              <Route path="/add-smtp" element={<AddSmtp />} />
              <Route path="/edit-smtp/:id" element={<AddSmtp />} />
              <Route path="/popup-list" element={<PopupList />} />
              <Route path="/add-popup" element={<AddPopup />} />
              <Route path="/edit-popup/:id" element={<AddPopup />} />
              <Route path="/category-list" element={<CategoryList />} />
              <Route path="/add-category" element={<AddCategory />} />
              <Route path="/edit-category/:id" element={<AddCategory />} />

              <Route path="/gallery-list" element={<GalleryList />} />
              <Route path="/add-gallery" element={<AddGallery />} />
              <Route path="/edit-gallery/:id" element={<AddGallery />} />
              <Route path="/client-logo-list" element={<ClientLogoList />} />
              <Route path="/add-client-logo" element={<AddClientLogo />} />
              <Route path="/edit-client-logo/:id" element={<AddClientLogo />} />
              <Route path="/partner-logo-list" element={<PartnerLogoList />} />
              <Route path="/add-partner-logo" element={<AddPartnerLogo />} />
              <Route path="/edit-partner-logo/:id" element={<AddPartnerLogo />} />
              <Route path="/zoho-auth/:id" element={<ZohoAuth />} />
              <Route path="/faq-category-list" element={<FaqCategoryList />} />
              <Route path="/add-faq-category" element={<AddFaqCategory />} />
              <Route path="/edit-faq-category/:id" element={<AddFaqCategory />} />
              <Route path="/faq-list" element={<FaqList />} />
              <Route path="/add-faq" element={<AddFaq />} />
              <Route path="/edit-faq/:id" element={<AddFaq />} />
              <Route path="/feedback-list" element={<FeedbackList />} />
              <Route path="/feedback/:id" element={<FeedbackSingle />} />
              <Route path="/recaptcha-list" element={<RecaptchaList />} />
              <Route path="/add-recaptcha" element={<AddRecaptcha />} />
              <Route path="/edit-recaptcha/:id" element={<AddRecaptcha />} />
              <Route path="/coupon-list" element={<CouponList />} />
              <Route path="/add-coupon" element={<AddCoupon />} />
              <Route path="/edit-coupon/:id" element={<AddCoupon />} />
            </Route>

            <Route path="*" element={<Missing />} />
          </Route>
          <Route path="/auth-status/:id" element={<ZohoStatus />} />
        </Routes>
        <AlertContainer alerts={alerts} />
        {isLoading && <Loading />}
      </BrowserRouter>
    </GlobalContext.Provider>
  );
}

export default App;
