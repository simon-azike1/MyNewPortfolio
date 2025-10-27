import React from 'react';
import { motion } from 'framer-motion';
import { User, Mail, Phone, MapPin, Code, ChevronDown, Download, Eye, MessageCircle } from 'lucide-react';
import profileAbout from '@/assets/Images/profile-about.jpg';
import profileMain2 from '@/assets/Images/profile-main2.png';

const Hero = () => {
  const scrollToSection = (id) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut"
      }
    }
  };

  const imageVariants = {
    hidden: { opacity: 0, scale: 0.8, rotate: -10 },
    visible: {
      opacity: 1,
      scale: 1,
      rotate: 0,
      transition: {
        duration: 0.8,
        ease: "easeOut"
      }
    }
  };

  return (
    <>
      {/* Hero Section */}
      <section id="home" className="hero-section">
        <div className="hero-background">
          <div className="hero-gradient"></div>
          <div className="hero-pattern"></div>
        </div>
        
        <div className="hero-container">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="hero-content"
          >
            {/* Text Content */}
            <div className="hero-text-content">
              <motion.div variants={itemVariants} className="hero-badge">
              </motion.div>
              
              <motion.h1 variants={itemVariants} className="hero-title">
              I'm{' '}
                <span className="hero-name">
                  Simon Azike
                  <div className="name-underline"></div>
                </span>
              </motion.h1>
              
              <motion.div variants={itemVariants} className="hero-role">
                <div className="role-icon">
                  <Code size={20} />
                </div>
                <span>Software Engineer </span>
              </motion.div>
              
              <motion.p variants={itemVariants} className="hero-description">
               As a Software and Network Engineer, I build secure, efficient, and high-performing digital systems. My expertise spans HTML, CSS, JavaScript, React, and Elasticsearch and other Network technologies, enabling me to create solutions that connect seamless front-end experiences with strong technical infrastructure.
              </motion.p>
              
              <motion.div variants={itemVariants} className="hero-actions">
                <button
                  onClick={() => scrollToSection('projects')}
                  className="btn btn-primary"
                >
                  <Eye size={18} />
                  View My Work
                </button>
                
                <button
                  onClick={() => scrollToSection('contact')}
                  className="btn btn-secondary"
                >
                  <MessageCircle size={18} />
                  Get In Touch
                </button>
                
                <a
                  href="/Azike_Simon_FrontEnd_Developer.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-outline"
                >
                  <Download size={18} />
                  Resume
                </a>
              </motion.div>
              
              <motion.div variants={itemVariants} className="hero-stats">
                <div className="stat-item">
                  <span className="stat-number">2+</span>
                  <span className="stat-label">Years Experience</span>
                </div>
                <div className="stat-divider"></div>
                <div className="stat-item">
                  <span className="stat-number">10+</span>
                  <span className="stat-label">Projects Completed</span>
                </div>
              </motion.div>
            </div>
            
            {/* Image Content */}
            <motion.div
              variants={imageVariants}
              className="hero-image-content"
            >
              <div className="hero-image-container">
                <div className="hero-image-wrapper">
                  <img 
                    src={profileMain2} 
                    alt="Simon Azike - Software Engineer" 
                    className="hero-image"
                  />
                  <div className="image-overlay"></div>
                </div>
                
                <div className="floating-elements">
                  <div className="floating-card floating-card-1">
                    <Code size={16} />
                    <span>React</span>
                  </div>
                  <div className="floating-card floating-card-2">
                    <span>JS</span>
                  </div>
                  <div className="floating-card floating-card-3">
                    <span>CSS</span>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
          
          {/* Scroll Indicator */}
          <motion.button
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1 }}
            className="scroll-indicator"
            onClick={() => scrollToSection("about")}
          >
            <motion.div
              animate={{ y: [0, 8, 0] }}
              transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
              className="scroll-icon"
            >
              <ChevronDown size={20} />
            </motion.div>
            <span className="scroll-text" style={{marginBottom:"4px"}}>Scroll to explore</span>
          </motion.button>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="about-section">
        <div className="about-container">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="section-header"
          >
            <div className="section-badge">
              <User size={16} />
              About Me
            </div>
  
          </motion.div>

          <div className="about-content">
            {/* Profile Card */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="profile-card"
            >
              <div className="profile-image-container">
                <img src={profileAbout} alt="Simon Azike - Professional" className="profile-image" />
                <div className="profile-status">
                  <div className="status-dot"></div>
                </div>
              </div>
              
              <div className="profile-info">
                <h3 className="profile-name">Simon Azike</h3>
                <p className="profile-title">Frontend Developer</p>
                
                <div className="contact-list">
                  <div className="contact-item">
                    <Mail size={16} />
                    <span>azikeshinye@gmail.com</span>
                  </div>
                  <div className="contact-item">
                    <Phone size={16} />
                    <span>+212 751-780853</span>
                  </div>
                  <div className="contact-item">
                    <MapPin size={16} />
                    <span>Sale Rabat, Morocco</span>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Journey Content */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              viewport={{ once: true }}
              className="journey-content"
            >
              <div className="journey-header">
                <h3 className="journey-title">My Journey</h3>
                <div className="journey-line"></div>
              </div>
              
              <div className="journey-text">
                <p>
                  I discovered my passion for coding shortly after starting{' '}
                  <span className="highlight">Cardiff Metropolitan University</span> on August 3rd, 2022. 
                  Coming from a high school background in Electrical and Electronics, programming 
                  quickly became more than a skill.
                </p>
                
                <div className="journey-highlight">
                  <div className="highlight-icon">
                    <Code size={20} />
                  </div>
                  <p>
                    It's now a craft I enjoy, constantly learning and creating solutions 
                    that make an impact.
                  </p>
                </div>
              </div>
              
              <div className="journey-metrics">
                <div className="metric">
                  <span className="metric-value">2022</span>
                  <span className="metric-label">Started Journey</span>
                </div>
                <div className="metric">
                  <span className="metric-value">20+</span>
                  <span className="metric-label">Skills Learned</span>
                </div>
                <div className="metric">
                  <span className="metric-value">∞</span>
                  <span className="metric-label">Passion Level</span>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Hero;
