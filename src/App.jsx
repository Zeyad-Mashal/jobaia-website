import "./App.css";
import Auth from "./Components/Auth/Auth";
import Home from "./Components/Home/Home";
import Job from "./Components/Job/Job";
import Header from "./Components/Navbar/Header";
import CustomFooter from "./Components/CustomFooter/CustomFooter";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";

import JobDetails from "./Components/JobDetails/JobDetails";
import FeedbackForm from "./Components/Feedback/FeedbackForm";
import ApplicationForm from "./Components/Application/Form";
import JobPosting from "./Components/PostJob/JobPosting";
import { useState } from "react";
import PreviewFeedback from "./Components/PreviewFeedBack/PreviewFeedback";
import ProfilePage from "./Components/UserProfile/ProfilePage";
import AboutUs from "./Components/AboutUs/AboutUs";
import ContactUs from "./Components/ContactUs/ContactUs";
import Dashboard from "./Components/UserProfile/Dashboard";
import BusJobs from "./Components/BusinessJobs/BusJobs";
import BProfilePage from "./Components/BusinessProfile/BProfilePage";
function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}

function AppContent() {
  const location = useLocation();
  const hideNavbarOnPaths = ["/auth"];
  return (
    <>
      {/* Show Navbar on all pages except those in hideNavbarOnPaths */}

      {!hideNavbarOnPaths.includes(location.pathname) && <Header />}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/auth" element={<Auth />} />
        <Route path="/jobs" element={<Job />} />
        <Route path="/jobsDetails/:id" element={<JobDetails />} />
        <Route path="/feedback/:userId/:jobId" element={<FeedbackForm />} />
        <Route path="/jobApp/:userId/:jobId" element={<ApplicationForm />} />
        <Route path="/create_job/:id" element={<JobPosting />} />
        <Route path="/preview_feedback" element={<PreviewFeedback />} />
        <Route path="/user_profile" element={<Dashboard />} />
        <Route path="/about" element={<AboutUs />} />
        <Route path="/contact" element={<ContactUs />} />
        <Route path="/business-jobs" element={<BusJobs />} />
        <Route path="/business-profile" element={<BProfilePage />} />
      </Routes>

      <CustomFooter />
    </>
  );
}

export default App;
