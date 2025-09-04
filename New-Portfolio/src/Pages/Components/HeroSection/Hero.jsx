import React from 'react';
import { motion } from 'framer-motion';
import { User, Mail, Phone, MapPin, Code, ChevronDown } from 'lucide-react';
import profileAbout from '@/assets/Images/profile-about.jpg';
import profileMain2 from '@/assets/Images/profile-main2.png'; 



const Hero = () => {
 const scrollToSection = (id) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

 return (
<>

{/* Hero Section */}
      <section id="home" className="hero">
        <div className="hero-bg" />
        <div className="hero-content">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="hero-text"
          >
            <h1 className="hero-title" style={{marginTop:"5rem"}}>
              Hi, I'm <span className="hero-title-accent"> Simon Azike</span>
            </h1>
            <p className="hero-subtitle">
              Software Engineer & Web Developer
            </p>
            <p className="hero-description">
            Driven to deliver innovative web solutions, with solid expertise in HTML, CSS, JavaScript, and React. Actively seeking opportunities to contribute meaningfully to impactful projects while continuing to grow and excel as a developer.
            </p>
           <div className="hero-buttons">
  <motion.button
    whileHover={{ scale: 1.05 }}
    whileTap={{ scale: 0.95 }}
    onClick={() => scrollToSection('projects')}
    className="btn btn-primary"
  >
    View My Work
  </motion.button>
  
  <motion.button
    whileHover={{ scale: 1.05 }}
    whileTap={{ scale: 0.95 }}
    onClick={() => scrollToSection('contact')}
    className="btn btn-secondary"
  >
    Get In Touch
  </motion.button>

  <a
  href="/Azike_Simon_FrontEnd_Developer.pdf"
  target="_blank"
  rel="noopener noreferrer"
  className="btn btn-primary"
>
  <motion.span
    whileHover={{ scale: 1.05 }}
    whileTap={{ scale: 0.95 }}
  >
    View Resume
  </motion.span>
</a>
</div>

</motion.div>
          
<motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="hero-image-container"
          >
            <div className="hero-image-wrapper"    >
              <div className="hero-image">
                <img 
                  src={profileMain2} 
                  alt="Azike Simon" 
                />
              </div>
              <div className="hero-image-icon">
                <Code size={32} />
              </div>
            </div>
          </motion.div>
        </div>
        
        {/* Scroll Indicator */}
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ repeat: Infinity, duration: 2 }}
          className="scroll-indicator"
          onClick={()=>scrollToSection("about")}
        >
          <ChevronDown size={24} />
        </motion.div>
      </section>




 <section id="about" className="section section-muted">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="section-header"
        >
          <h2 className="section-title">About Me</h2>
          <p className="section-description">
            Learn more about my background, skills, and passion for web development
          </p>
        </motion.div>

        <div className="about-grid">
          {/* Profile Image */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="about-image-container"
          >
            <div className="about-image-wrapper">
              <div className="about-image">
                <img src={profileAbout} alt="Azike Simon - Professional" />
              </div>
              <div className="about-image-icon">
                <User size={24} />
              </div>
            </div>
          </motion.div>

          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <div className="contact-card">
              <Mail className="contact-card-icon" size={32} />
              <h3 className="contact-card-title">Contact Info</h3>
              <div className="contact-info">
                <div className="contact-item">
                  <Mail size={16} className="contact-item-icon" />
                  <span className="contact-item-text">azikeshinye@gmail.com</span>
                </div>
                <div className="contact-item">
                  <Phone size={16} className="contact-item-icon" />
                  <span className="contact-item-text">+212 751-780853</span>
                </div>
                <div className="contact-item">
                  <MapPin size={16} className="contact-item-icon" />
                  <span className="contact-item-text">Bab Cheffa Sale Rabat, Morocco</span>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Journey Text */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            viewport={{ once: true }}
            className="journey-content"
          >
            <h3 className="journey-title">My Journey</h3>
            <hr style={{ background: "gray", padding: "1px", marginBottom: "9px", border: "none", width: "100%" }} />
            <p className="journey-text">
           I discovered my passion for coding shortly after starting <b style={{color:"white"}}>Cardiff Metropolitan University</b> on  August 3rd, 2022. Coming from a high school background in Electrical and Electronics, programming quickly became more than a skill , it’s now a craft I enjoy, constantly learning and creating solutions that make an impact.
            </p>
            <hr style={{ background: "gray", padding: "1px", marginBottom: "9px", border: "none", width: "100%" }} />
          </motion.div>
        </div>
      </div>
    </section>

</>
   
  );
};

export default Hero;
