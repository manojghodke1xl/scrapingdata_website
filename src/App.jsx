import { useReducer, useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AlertContainer, useAlert } from "./comps/alerts";
import { authReducer, authState, GlobalContext } from "./GlobalContext";
import Auth from "./comps/auth";
import DeAuth from "./comps/deauth";
import Home from "./pages/home";
import Missing from "./pages/missing";
import Loading from "./comps/loading";
import Signin from "./pages/signin";
import Layout from "./comps/layout";
import Dashboard from "./pages/dashboard";
import EnquiryList from "./pages/enquirylist";
import MailingList from "./pages/mailinglist";
import SiteList from "./pages/sitelist";
import AddSite from "./pages/addsite";
import EnquirySingle from "./pages/enquirysingle";
import MailingSingle from "./pages/mailingsingle";
import AdminList from "./pages/adminlist";
import AddAdmin from "./pages/addadmin";
import GuideList from "./pages/guidelist";
import AddGuide from "./pages/addguide";
import CaseStudyList from "./pages/casestudylist";
import AddCaseStudy from "./pages/addcasestudy";

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
              <Route path="/enquiry/:id" element={<EnquirySingle />} />
              <Route path="/mailing-list" element={<MailingList />} />
              <Route path="/mailing/:id" element={<MailingSingle />} />
              <Route path="/site-list" element={<SiteList />} />
              <Route path="/admin-list" element={<AdminList />} />
              <Route path="/add-admin" element={<AddAdmin />} />
              <Route path="/add-admin/:id" element={<AddAdmin />} />
              <Route path="/add-site" element={<AddSite />} />
              <Route path="/edit-site/:id" element={<AddSite />} />
              <Route path="/guide-list" element={<GuideList />} />
              <Route path="/add-guide" element={<AddGuide />} />
              <Route path="/add-guide/:id" element={<AddGuide />} />

              <Route path="/casestudy-list" element={<CaseStudyList />} />
              <Route path="/add-casestudy" element={<AddCaseStudy />} />
              <Route path="/add-casestudy/:id" element={<AddCaseStudy />} />
            </Route>

            <Route path="*" element={<Missing />} />
          </Route>
        </Routes>
        <AlertContainer alerts={alerts} />
        {isLoading && <Loading />}
      </BrowserRouter>
    </GlobalContext.Provider>
  );
}

export default App;
