import { BrowserRouter, Routes, Route } from "react-router-dom";

import HomePage from "./components/HomePage";
import LoginForm from "./components/LoginForm";
import RegisterForm from "./components/RegisterForm";
import ScholarshipList from "./components/ScholarshipList";
import CreateApplicationPage from "./components/CreateApplicationPage";
import ApplicationList from "./components/ApplicationList";
import AdminDashboard from "./components/AdminDashboard";
import ProfilePage from "./components/ProfilePage";
import ScholarshipDetails from "./components/ScholarshipDetails";
import CreateScholarship from "./components/CreateScholarship";
import EditScholarship from "./components/EditScholarshipPage";

import PrivateRoute from "./components/PrivateRoute";
import AdminRoute from "./components/AdminRoute";
import FAQPage from "./components/FAQPage";
import AboutPage from "./components/AboutPage";
import ContactPage from "./components/ContactPage";
import PrivacyPolicyPage from "./components/PrivacyPolicyPage";

function App() {
  return (
    <BrowserRouter>
      <Routes>

        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginForm />} />
        <Route path="/register" element={<RegisterForm />} />
        <Route path="/scholarships" element={<ScholarshipList />} />
        <Route path="/scholarship/:id" element={<ScholarshipDetails />} />

        <Route path="/apply/:id" element={<PrivateRoute><CreateApplicationPage /></PrivateRoute>} />

        <Route path="/applications" element={<PrivateRoute><ApplicationList /></PrivateRoute>} />

        <Route path="/profile" element={<PrivateRoute><ProfilePage /></PrivateRoute>} />

        <Route path="/admin" element={<AdminRoute><AdminDashboard /></AdminRoute>} />

        <Route path="/admin/create-scholarship" element={<AdminRoute><CreateScholarship /></AdminRoute>} />

        <Route path="/admin/edit-scholarship/:id" element={<AdminRoute><EditScholarship /></AdminRoute>} />
        <Route path="/faq"element={<FAQPage />}/>
        <Route path="/about" element={<AboutPage />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/privacy-policy"element={<PrivacyPolicyPage />}/>

      </Routes>
    </BrowserRouter>
  );
}

export default App;