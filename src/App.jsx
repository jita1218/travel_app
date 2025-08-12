import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

import HomePage from "./pages/HomePage";
import BlogPage from './pages/BlogPage';
import AboutPage from "./pages/AboutPage";
import BlogForm from './pages/BlogForm';
import PackageForm from './pages/PackageForm';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Logout from './pages/logout';
import Location from './pages/location';
import WishlistPage from './pages/WishlistPage';
import MyBookingsPage from './pages/MyBookingsPage'; 
import PrivacyPolicyPage from './pages/PrivacyPolicyPage';
import TermsOfServicePage from './pages/TermsOfServicePage';

function App() {
  return (
    <Router>
      <div style={{ width: "100vw", minHeight: "100vh", display: "flex", flexDirection: "column" }}>
        <Navbar />
        <div style={{ flex: 1, width: "100%", display: "flex", flexDirection: "column" }}>
          <Routes>
            <Route path="/" element={<FullPageWrapper><HomePage /></FullPageWrapper>} />
            <Route path="/about" element={<FullPageWrapper><AboutPage /></FullPageWrapper>} />
            <Route path="/location" element={<FullPageWrapper><Location /></FullPageWrapper>} />
            <Route path="/blog" element={<FullPageWrapper><BlogPage /></FullPageWrapper>} />
            <Route path="/blogform" element={<FullPageWrapper><BlogForm /></FullPageWrapper>} />
            <Route path="/register-package" element={<FullPageWrapper><PackageForm /></FullPageWrapper>} />
            <Route path="/login" element={<FullPageWrapper><Login /></FullPageWrapper>} />
            <Route path="/signup" element={<FullPageWrapper><Signup /></FullPageWrapper>} />
            <Route path="/logout" element={<FullPageWrapper><Logout /></FullPageWrapper>} />
            <Route path="/wishlist" element={<FullPageWrapper><WishlistPage /></FullPageWrapper>} />
            <Route path="/my-bookings" element={<FullPageWrapper><MyBookingsPage /></FullPageWrapper>} />
            <Route path="/privacy-policy" element={<PrivacyPolicyPage />} />
            <Route path="/terms-of-service" element={<TermsOfServicePage />} />
          </Routes>
        </div>
        <Footer />
      </div>
    </Router>
  );
}

function FullPageWrapper({ children }) {
  return (
    <div style={{ width: "100%", flex: 1, display: "flex", flexDirection: "column" }}>
      {children}
    </div>
  );
}

export default App;
