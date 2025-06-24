// src/App.jsx

import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

import HomePage from "./pages/HomePage";
import RegisterPage from "./pages/RegisterPage";
import BlogPage from './pages/BlogPage';
import AboutPage from "./pages/AboutPage";
import BlogForm from './pages/BlogForm';


function App() {
  return (
    <Router>
      <div style={{ width: "100vw", minHeight: "100vh", display: "flex", flexDirection: "column" }}>
        <Navbar />
        <div style={{ flex: 1, width: "100%", display: "flex", flexDirection: "column" }}>
          <Routes>
            <Route path="/" element={<FullPageWrapper><HomePage /></FullPageWrapper>} />
            <Route path="/register" element={<FullPageWrapper><RegisterPage /></FullPageWrapper>} />
            <Route path="/about" element={<FullPageWrapper><AboutPage /></FullPageWrapper>} />
            <Route path="/blog" element={<FullPageWrapper><BlogPage /></FullPageWrapper>} />
            <Route path="/blogform" element={<FullPageWrapper><BlogForm /></FullPageWrapper>} />
            {/* Add more routes as needed */}
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
