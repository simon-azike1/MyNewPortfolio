import React, { useState, useEffect } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Heart,
  ArrowUp,
  Github,
  Linkedin,
  Twitter,
  Mail,
  Code,
  Coffee,
  Zap
} from 'lucide-react'

const Footer = () => {
  const navigate = useNavigate()
  const location = useLocation()
  const [showScrollTop, setShowScrollTop] = useState(false)
  const [currentYear] = useState(new Date().getFullYear())

  // Hide footer on admin pages
  if (location.pathname.startsWith('/admin')) {
    return null
  }

  // Show scroll to top button when user scrolls down
  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 500)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Smooth scroll to top
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    })
  }

  // Social links data
  const socialLinks = [
    { 
      name: 'GitHub', 
      icon: Github, 
      url: 'https://github.com/simon-azike1',
      color: '#181717' 
    },
    { 
      name: 'LinkedIn', 
      icon: Linkedin, 
      url: 'https://www.linkedin.com/in/simonzik/',
      color: '#0077b5' 
    },
    
    { 
      name: 'Email', 
      icon: Mail, 
      url: 'mailto:your.email@example.com',
      color: '#EA4335' 
    }
  ]

  // Quick links data
  const quickLinks = [
    { name: 'About', href: '#about' },
    { name: 'Projects', href: '#projects' },
    { name: 'Skills', href: '#skills' },
    { name: 'Contact', href: '#contact' }
  ]

  // Tech stack data
  const techStack = [
    { name: 'React', icon: '' },
    { name: 'Tailwind', icon: '' },
    { name: 'Framer Motion', icon: '' }
  ]

  return (
    <>
      {/* Enhanced Footer */}
      <footer className="bg-dark text-white py-16">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
          <div className="space-y-12">
            {/* Main Footer Content */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
              {/* Brand Section */}
              <motion.div
                className="space-y-4"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                viewport={{ once: true }}
              >
                <a href="#home" className="inline-flex items-center gap-3 group">
                  <span className="text-2xl font-bold text-primary">SimZik</span>
                </a>
                <p className="text-gray-400 leading-relaxed">
                  Crafting digital experiences with passion and precision.
                  Transforming ideas into reality.
                </p>
              </motion.div>

              {/* Quick Links */}
              <motion.div
                className="space-y-4"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                viewport={{ once: true }}
              >
                <h3 className="font-bold text-lg">Quick Links</h3>
                <div className="flex flex-col gap-2">
                  {quickLinks.map((link, index) => (
                    <motion.a
                      key={link.name}
                      href={link.href}
                      className="text-gray-400 hover:text-primary transition-colors inline-block"
                      whileHover={{ x: 4 }}
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.3, delay: index * 0.05 }}
                      viewport={{ once: true }}
                    >
                      {link.name}
                    </motion.a>
                  ))}
                </div>
              </motion.div>

              {/* Social Links */}
              <motion.div
                className="space-y-4"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                viewport={{ once: true }}
              >
                <h3 className="font-bold text-lg">Connect</h3>
                <div className="flex gap-4">
                  {socialLinks.map((social, index) => (
                    <motion.a
                      key={social.name}
                      href={social.url}
                      className="w-10 h-10 bg-dark-light hover:bg-primary rounded-lg flex items-center justify-center transition-colors"
                      target="_blank"
                      rel="noopener noreferrer"
                      whileHover={{ y: -4, scale: 1.1 }}
                      whileTap={{ scale: 0.95 }}
                      initial={{ opacity: 0, scale: 0 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.3, delay: index * 0.1 }}
                      viewport={{ once: true }}
                      aria-label={social.name}
                    >
                      <social.icon size={20} />
                    </motion.a>
                  ))}
                </div>
              </motion.div>
            </div>

            {/* Footer Bottom */}
            <motion.div
              className="pt-8 border-t border-gray-800 flex flex-col sm:flex-row items-center justify-between gap-4"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              viewport={{ once: true }}
            >
              <div className="flex items-center gap-4">
                <p className="text-gray-400 text-sm text-center sm:text-left">
                  © {currentYear} SimZik. Built with passion
                </p>
                <button
                  onClick={() => navigate('/admin/login')}
                  className="text-gray-600 hover:text-gray-400 text-xs transition-colors"
                  aria-label="Admin"
                >
                  •
                </button>
              </div>

              <div className="flex items-center gap-2 text-sm text-gray-400">
                <Code size={14} />
                <span>Built with:</span>
                <div className="flex gap-2">
                  {techStack.map((tech, index) => (
                    <motion.span
                      key={tech.name}
                      className="px-2 py-1 bg-dark-light rounded text-xs hover:bg-primary hover:text-white transition-colors cursor-default"
                      whileHover={{ y: -2 }}
                      initial={{ opacity: 0, y: 10 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3, delay: index * 0.1 }}
                      viewport={{ once: true }}
                    >
                      {tech.name}
                    </motion.span>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </footer>

      {/* Scroll to Top Button */}
      <AnimatePresence>
        {showScrollTop && (
          <motion.button
            className="fixed bottom-8 right-8 w-12 h-12 bg-primary text-white rounded-full flex items-center justify-center shadow-lg hover:bg-primary-dark transition-colors z-50"
            onClick={scrollToTop}
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0 }}
            whileHover={{ y: -4, scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            aria-label="Scroll to top"
          >
            <ArrowUp size={24} />
          </motion.button>
        )}
      </AnimatePresence>
    </>
  )
}

export default Footer
