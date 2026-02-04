import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar/Navbar';
import Hero from './components/HeroSection/Hero';
import Skill from './components/Skills/Skill';
import Project from './components/Projects/Projects';
import Testimonials from './components/Testimonials/Testimonials';
import Contact from './Pages/Contact/Contact';
import Footer from './components/Footer/Footer';
import AdminLogin from './Pages/Admin/AdminLogin';
import AdminDashboard from './Pages/Admin/AdminDashboard';
import { ThemeProvider } from './context/ThemeContext';
import ThemeToggle from './components/ThemeToggle';

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
    <ThemeProvider>
      {/* Theme Toggle Button - will appear on all pages */}
      <ThemeToggle />
      
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
                <AdminDashboard onLogout={() => {
                  localStorage.removeItem('adminToken');
                  setIsAdminAuthenticated(false);
                }} />
              </ProtectedAdminRoute>
            }
          />

          {/* Catch all - redirect to home */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Router>
    </ThemeProvider>
  );
}

export default App;