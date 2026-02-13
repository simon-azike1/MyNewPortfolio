import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Menu, X, Download, Github, Linkedin, Twitter, Sun, Moon } from 'lucide-react';
import { useTheme } from '../../context/ThemeContext';

const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { theme, toggleTheme } = useTheme();

  const [isOpen, setIsOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const [isScrolled, setIsScrolled] = useState(false);

  // Hide navbar on admin pages
  if (location.pathname.startsWith('/admin')) return null;

  const navItems = [
    { id: 'home', name: 'Home' },
    { id: 'about', name: 'About' },
    { id: 'skills', name: 'Skills' },
    { id: 'projects', name: 'Projects' },
    { id: 'contact', name: 'Contact' }
  ];

  const socialLinks = [
    { name: 'GitHub', icon: Github, url: 'https://github.com/samzik234' },
    { name: 'LinkedIn', icon: Linkedin, url: 'https://www.linkedin.com/in/simonzik/' },
    { name: 'Twitter', icon: Twitter, url: 'https://www.instagram.com/simonazike155/' }
  ];

  // Scroll spy
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
      navItems.forEach(item => {
        const el = document.getElementById(item.id);
        if (!el) return;
        const rect = el.getBoundingClientRect();
        if (rect.top <= 100 && rect.bottom >= 100) {
          setActiveSection(item.id);
        }
      });
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id) => {
    if (location.pathname !== '/') {
      navigate('/');
      setTimeout(() => scrollTo(id), 120);
    } else {
      scrollTo(id);
    }
    setIsOpen(false);
  };

  const scrollTo = (id) => {
    const el = document.getElementById(id);
    if (!el) return;
    window.scrollTo({ top: el.offsetTop - 80, behavior: 'smooth' });
  };

  const handleResumeDownload = () => {
    const link = document.createElement('a');
    link.href = '/Azike_Simon_Software_Engineer.pdf';
    link.download = 'Azike_Simon_Software_Engineer.pdf';
    link.click();
  };

  // Close mobile menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (isOpen && !e.target.closest('nav')) {
        setIsOpen(false);
      }
    };
    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, [isOpen]);

  return (
    <>
      {/* NAVBAR */}
      <nav
        className={`fixed p-2 top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled
            ? 'bg-theme-bg-primary shadow-lg'
            : 'bg-theme-bg-primary backdrop-blur-sm'
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 py-4 border-b border-theme">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <a
              href="/"
              className="cursor-pointer text-2xl font-bold text-theme-accent-primary"
              onClick={(e) => {
                e.preventDefault();
                scrollToSection('home');
              }}
            >
              SimZik
            </a>

            {/* Desktop Nav */}
            <div className="hidden md:flex items-center gap-8">
              {navItems.map(item => (
                <button
                  key={item.id}
                  onClick={() => scrollToSection(item.id)}
                  className={`font-medium transition-colors ${
                    activeSection === item.id
                      ? 'text-theme-accent-primary'
                      : 'text-theme-text-secondary hover:text-theme-accent-primary'
                  }`}
                >
                  {item.name}
                </button>
              ))}
            </div>

            {/* Desktop Actions */}
            <div className="hidden lg:flex items-center gap-4">
              {socialLinks.slice(0, 2).map(({ name, icon: Icon, url }) => (
                <a
                  key={name}
                  href={url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-theme-text-secondary hover:text-theme-accent-primary transition-colors"
                  title={name}
                >
                  <Icon size={20} />
                </a>
              ))}

              {/* Theme Toggle */}
              <button
                onClick={toggleTheme}
                className="w-10 h-10 rounded-lg bg-theme-bg-secondary border border-theme flex items-center justify-center text-theme-text-primary"
              >
                {theme === 'light' ? <Moon size={18} /> : <Sun size={18} />}
              </button>

              {/* Resume */}
              <button onClick={handleResumeDownload} className="btn btn-primary">
                <Download size={16} />
                Resume
              </button>
            </div>

            {/* Mobile Menu Button */}
            <button
              className="md:hidden w-10 h-10 flex items-center justify-center text-theme-text-primary"
              onClick={(e) => {
                e.stopPropagation();
                setIsOpen(!isOpen);
              }}
              aria-label="Toggle mobile menu"
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* MOBILE MENU */}
        {isOpen && (
            <div className="md:hidden bg-theme-bg-primary border-t border-theme">
              <div className="px-6 py-8 space-y-6">
                {navItems.map(item => (
                  <button
                    key={item.id}
                    onClick={() => scrollToSection(item.id)}
                    className={`block w-full text-left px-4 py-3 rounded-lg ${
                      activeSection === item.id
                      ? 'bg-theme-bg-secondary text-theme-accent-primary font-medium'
                      : 'text-theme-text-primary hover:bg-theme-bg-secondary'
                    }`}
                  >
                    {item.name}
                  </button>
                ))}

              {/* Mobile Theme Toggle */}
              <button
                onClick={toggleTheme}
                className="w-full py-3 px-4 rounded-lg bg-theme-bg-secondary border border-theme text-theme-text-primary font-medium flex items-center justify-center gap-2"
              >
                {theme === 'dark' ? (
                  <>
                    <Sun size={18} />
                    <span>Light Mode</span>
                  </>
                ) : (
                  <>
                    <Moon size={18} />
                    <span>Dark Mode</span>
                  </>
                )}
              </button>

              {/* Mobile Social Links */}
              <div className="pt-4 border-t border-theme">
                <p className="text-sm text-theme-text-tertiary mb-3">Connect with me</p>
                <div className="flex gap-3">
                  {socialLinks.map(({ name, icon: Icon, url }) => (
                    <a
                      key={name}
                      href={url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1 py-3 bg-theme-bg-secondary border border-theme rounded-lg flex items-center justify-center gap-2 text-theme-text-secondary"
                    >
                      <Icon size={18} />
                      <span className="text-sm">{name}</span>
                    </a>
                  ))}
                </div>
              </div>

              {/* Mobile Resume */}
              <button
                onClick={handleResumeDownload}
                className="w-full btn btn-primary"
              >
                <Download size={18} />
                Download Resume
              </button>
            </div>
          </div>
        )}
      </nav>
    </>
  );
};

export default Navbar;
