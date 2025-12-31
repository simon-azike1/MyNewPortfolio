import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './Pages/Components/Navbar/Navbar';
import Hero from './Pages/Components/HeroSection/Hero';
import Skill from './Pages/Components/Skills/Skill';
import Project from './Pages/Components/Projects/Projects';
import Testimonials from './Pages/Components/Testimonials/Testimonials';
import Contact from './Pages/Contact/Contact';
import Footer from './Pages/Components/Footer/Footer';
import AdminLogin from './Pages/Admin/AdminLogin';
import AdminDashboard from './Pages/Admin/AdminDashboard';

function App() {
  const [isAdminAuthenticated, setIsAdminAuthenticated] = useState(false);

  const PortfolioPage = () => (
    <div className="min-h-screen bg-white">
      <Navbar />
      <main className="pt-20">
        <Hero />
        <Skill />
        <Project />
        <Testimonials />
        <Contact />
      </main>
      <Footer />
    </div>
  );

  const ProtectedAdminRoute = ({ children }) => {
    return isAdminAuthenticated ? children : <Navigate to="/admin/login" replace />;
  };

  return (
    <Router>
      <Routes>
        {/* Portfolio Routes */}
        <Route path="/" element={<PortfolioPage />} />

        {/* Admin Routes */}
        <Route
          path="/admin/login"
          element={
            isAdminAuthenticated ? (
              <Navigate to="/admin/dashboard" replace />
            ) : (
              <AdminLogin onLogin={() => setIsAdminAuthenticated(true)} />
            )
          }
        />
        <Route
          path="/admin/dashboard"
          element={
            <ProtectedAdminRoute>
              <AdminDashboard onLogout={() => setIsAdminAuthenticated(false)} />
            </ProtectedAdminRoute>
          }
        />

        {/* Catch all - redirect to home */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
}

export default App;
