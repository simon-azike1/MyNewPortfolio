import React, { useState, useEffect } from 'react'
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
  const [showScrollTop, setShowScrollTop] = useState(false)
  const [currentYear] = useState(new Date().getFullYear())

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
      <footer className="footer-enhanced">
        <div className="container">
          <div className="footer-content">
            {/* Main Footer Content */}
            <div className="footer-main">
              {/* Brand Section */}
              <motion.div 
                className="footer-brand-section"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                viewport={{ once: true }}
              >
                <a href="#home" className="footer-brand">
                  <div className="footer-logo">
                    <img 
                      src="./src/assets/Images/BuildLabs.png" 
                      alt="BuildLabs Logo" 
                      className="footer-logo-img"
                    />
                  </div>
                  <span>BuildLabs</span>
                </a>
                <p className="footer-tagline">
                  Crafting digital experiences with passion and precision. 
                  Transforming ideas into reality.
                </p>
              </motion.div>

              {/* Social Links */}
              <motion.div 
                className="footer-social"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                viewport={{ once: true }}
              >
                {socialLinks.map((social, index) => (
                  <motion.a
                    key={social.name}
                    href={social.url}
                    className="footer-social-link"
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ y: -4, scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                    initial={{ opacity: 0, scale: 0 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.3, delay: index * 0.1 }}
                    viewport={{ once: true }}
                    aria-label={social.name}
                    style={{ '--social-color': social.color }}
                  >
                    <social.icon size={20} />
                  </motion.a>
                ))}
              </motion.div>

              {/* Quick Links */}
              <motion.div 
                className="footer-links"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                viewport={{ once: true }}
              >
                {quickLinks.map((link, index) => (
                  <motion.a
                    key={link.name}
                    href={link.href}
                    className="footer-link"
                    whileHover={{ x: 4 }}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3, delay: index * 0.05 }}
                    viewport={{ once: true }}
                  >
                    {link.name}
                  </motion.a>
                ))}
              </motion.div>
            </div>

            {/* Footer Bottom */}
            <motion.div 
              className="footer-bottom"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              viewport={{ once: true }}
            >
              <div className="footer-copyright">
                <p>
                  © {currentYear} BuildLabs. Built with Purpose
                  <motion.span
                    className="footer-heart"
                    animate={{ scale: [1, 1.2, 1] }}
                    transition={{ duration: 1, repeat: Infinity }}
                  >
                    {/* <Heart size={16} fill="currentColor" /> */}
                  </motion.span>{' '}
                  
                  {/* <Coffee size={16} className="inline" /> */}
                </p>
              </div>

              <div className="footer-tech">
                <span className="footer-tech-label">
                  <Code size={14} /> Built with:
                </span>
                <div className="footer-tech-stack">
                  {techStack.map((tech, index) => (
                    <motion.span
                      key={tech.name}
                      className="footer-tech-item"
                      whileHover={{ y: -2 }}
                      initial={{ opacity: 0, y: 10 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3, delay: index * 0.1 }}
                      viewport={{ once: true }}
                    >
                      <span className="tech-icon">{tech.icon}</span>
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
            className="scroll-to-top"
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
