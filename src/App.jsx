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
import EditMember from "./pages/editmember";
import AddSite from "./pages/addsite";
// import EventList from "./pages/eventlist";
// import EventBooking from "./pages/eventbooking";
// import CreateEvent from "./pages/createevent";
// import EditEvent from "./pages/editevent";

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
              <Route path="/mailing-list" element={<MailingList />} />
              <Route path="/site-list" element={<SiteList />} />
              <Route path="/add-site" element={<AddSite />} />
              {/* <Route path="/mailing-list" element={<EventList />} /> */}
              {/* <Route path="/event-booking/:eid" element={<EventBooking />} /> */}
              {/* <Route path="/edit-event/:eid" element={<EditEvent />} /> */}
              {/* <Route path="/site-list" element={<CreateEvent />} /> */}
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
