import './index.css'
import { useState, useEffect } from 'react'
import emailjs from "@emailjs/browser";
import { useRef } from "react";
import { motion, AnimatePresence } from 'framer-motion'
import image1 from './assets/barber1.png'
import image2 from './assets/movieMania.png'
import image3 from './assets/TheRecipeBook.png'
import image4 from './assets/DeHireVentures.png'
import tributePageImage from './assets/tributes.png'
import blogSiteImage from './assets/blogPage.png'
import profileMain from './assets/profile.jpg'
import profileAbout from './assets/profile-about.jpg'

import { 
  Code, 
  User, 
  Mail, 
  Phone, 
  MapPin, 
  Github, 
  Linkedin, 
  ExternalLink,
  Menu,
  X,
  ChevronDown,
  Youtube,
  Facebook,
  Instagram,
  Italic
} from 'lucide-react'


function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [activeSection, setActiveSection] = useState('home')
  

  useEffect(() => {
    const handleScroll = () => {
      const sections = ['home', 'about', 'skills', 'projects', 'contact']
      const scrollPosition = window.scrollY + 100

      for (const section of sections) {
        const element = document.getElementById(section)
        if (element) {
          const offsetTop = element.offsetTop
          const offsetHeight = element.offsetHeight
          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            setActiveSection(section)
            break
          }
        }
      }
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    }
    setIsMenuOpen(false)
  }

const form = useRef();
const handleSubmit = (e) => {
  e.preventDefault();
  emailjs.sendForm(
    "service_4bksq8k",   
    "template_rg09fy2",  
    form.current,
    "xL6_CntdprOU1DvCJ" 
  ).then(
    (result) => {
      console.log("SUCCESS!", result.text);
      form.current.reset();
      alert("Message sent successfully!");
    },
    (error) => {
      console.log("FAILED...", error.text);
      alert("Something went wrong. Please try again.");
    }
  );
};


  const skills = [
    { name: 'JavaScript', level: 90, color: 'skill-bar-js' },
    { name: 'HTML/CSS', level: 95, color: 'skill-bar-html' },
    { name: 'MongoDB', level: 50, color: 'skill-bar-node' },
    { name: 'Express', level: 50, color: 'skill-bar-node' },
    { name: 'React', level: 80, color: 'skill-bar-react' },
    { name: 'Node.js', level: 75, color: 'skill-bar-node' },
    { name: 'Git', level: 85, color: 'skill-bar-git' },
    { name: 'GitHub', level: 85, color: 'skill-bar-git' },
    { name: 'ElasticSearch', level: 75, color: 'skill-bar-git' },
    { name: 'Linux Administraion', level: 85, color: 'skill-bar-git' }

  ]

  const projects = [
    {
      title: 'Barber Shop Website',
      description: 'A full-stack barbershop solution built with React and Node.js, featuring online booking system, service scheduling, appointment management, and barber professional profiles. Includes email notifications and responsive design.',
      technologies: ['React', 'Node.js', 'EmailJS', 'CSS3', 'MongoDB'],
      image: image1,
      github: 'https://github.com/simon-azike1/barberShopWebApp',
      live: 'https://barber-shop-web-app-mhma.vercel.app/',
    },
    {
      title: 'Movie Mania',
      description: 'A dynamic movie discovery platform that allows users to search, browse, and explore movies with detailed information. Features include movie ratings, trailers, cast information, and personalized recommendations using external movie APIs.',
      technologies: ['HTML5', 'CSS3', 'JavaScript', 'Movie API', 'Bootstrap'],
      image: image2,
      github: 'https://github.com/samzik234/MovieMania',
      live: 'https://movie-mania-drab-six.vercel.app/'
    },
    {
      title: 'TheRecipeBook',
      description: 'A comprehensive recipe management application where users can discover, save, and organize their favorite recipes. Features include recipe search, ingredient lists, cooking instructions, and nutritional information with a clean, user-friendly interface.',
      technologies: ['HTML5', 'CSS3', 'React', 'Recipe API', 'LocalStorage'],
      image: image3,
      github: 'https://github.com/simon-azike1/THERECIPEBOOK',
      live: 'https://therecipebook-liard.vercel.app/'
    },
    {
      title: 'DeHireVentures HR System',
      description: 'A comprehensive Human Resource Management System designed for modern businesses. Features include employee management, payroll processing, attendance tracking, performance evaluations, and reporting dashboards with role-based access control.',
      technologies: ['Node.js', 'Express', 'MongoDB', 'React', 'JWT Auth'],
      image: image4,
      github: 'https://github.com/samzik234/HRMS',
      live: 'https://hrms-client-self.vercel.app/'
    },
    
    {
      title: 'Tribute Page',
      description: 'A tribute webpage created using HTML, CSS, and JavaScript that honors a significant figure Vincent. The page includes sections for biography, achievements, and a gallery with responsive design.',
      technologies: ['HTML5', 'CSS3', 'JavaScript'],
      image: tributePageImage,
      github: 'https://github.com/samzik234/TributeHomePage',
      live: 'https://tribute-home-page.vercel.app/'
    },
    {
      title: 'Blog Site',
      description: 'A fully functional blog site developed with React, enabling users to read, create, and comment on posts. Features client-side routing, state management, and a clean, responsive UI.',
      technologies: ['React', 'JavaScript', 'CSS3'],
      image: blogSiteImage,
      github: 'https://github.com/simon-azike1/Blog-Page',
      live: 'https://blog-page-sh5d.vercel.app/'
    }
  ]


  return (
    <div style={{ minHeight: '100vh', backgroundColor: 'var(--background)', color: 'var(--foreground)' }}>

      {/* Navigation */}
      <nav className="nav">
        <div className="nav-container">
       
        <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="nav-logo"
          >
          simon.A 
          </motion.div>

          {/* Desktop Navigation */}
          <div className="nav-menu desktop">
            {['home', 'about', 'skills', 'projects', 'contact'].map((item) => (
              <button
                key={item}
                onClick={() => scrollToSection(item)}
                className={`nav-button ${activeSection === item ? 'active' : ''}`}
              >
                {item}
              </button>
            ))}
          </div>

          {/* Mobile Menu Button */}
          <button
            className="mobile-menu-button"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle menu">

            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Navigation */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="mobile-menu"
            >
              <div style={{ padding: '1rem', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                {['home', 'about', 'skills', 'projects', 'contact'].map((item) => (
                  <button
                    key={item}
                    onClick={() => scrollToSection(item)}
                    className="mobile-menu-item"
                  >
                    {item}
                  </button>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

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
              Hi, I'm <span className="hero-title-accent"> simon.A</span>
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
                  src={profileMain} 
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

      {/* About Section */}
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
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="about-image-container"
            >
              <div className="about-image-wrapper">
                <div className="about-image">
                  <img 
                    src={profileAbout} 
                    alt="Azike Simon - Professional" />
                </div>
                <div className="about-image-icon">
                  <User size={24} />
                </div>
              </div>
            </motion.div>

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

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              viewport={{ once: true }}
              className="journey-content"
            >
              <h3 className="journey-title">My Journey</h3>
              <p className="journey-text"  style={{textAlign:"justify"}}>
              <hr  style={{background:"gray", padding:"1px", marginBottom:"9px", border:"none", width:"100%"}}/>
               I’m a software engineer with a genuine passion for building web solutions and strengthening network security. My journey started on August 3rd, 2022, and since then, coding has become more than just a skill, it’s something I truly enjoy. Along the way, I’ve developed solid technical expertise and thrive in Agile environments, always eager to learn, grow, and make a real impact through technology.
              </p>
              <hr  style={{background:"gray", padding:"1px", marginBottom:"9px", border:"none", width:"100%"}}/>
            
            
            </motion.div>
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section id="skills" className="section">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="section-header"
          >
            <h2 className="section-title">Skills & Technologies</h2>
            <p className="section-description">
              Here are the technologies and tools I work with to bring ideas to life
            </p>
          </motion.div>

          <div className="skills-grid">
            {skills.map((skill, index) => (
              <motion.div
                key={skill.name}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="skill-card"
              >
                <div className="skill-header">
                  <h3 className="skill-name">{skill.name}</h3>
                  <span className="skill-percentage">{skill.level}%</span>
                </div>
                <div className="skill-bar-bg">
                  <motion.div
                    initial={{ width: 0 }}
                    whileInView={{ width: `${skill.level}%` }}
                    transition={{ duration: 1, delay: index * 0.1 }}
                    viewport={{ once: true }}
                    className={`skill-bar ${skill.color}`}
                  />
                </div>
              </motion.div>
            ))}
          </div>

          {/* Tools Section */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="tools-section"
          >
            <h3 className="tools-title">Tools & Platforms</h3>
            <div className="tools-list">
              {['Asana', 'Hubspot CRM', 'Jira', 'Monday', 'ClickUP', 'Git', 'VS Code', 'Figma'].map((tool) => (
                <span
                  key={tool}
                  className="tool-tag"
                >
                  {tool}
                </span>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="section section-muted">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="section-header"
          >
            <h2 className="section-title">Featured Projects</h2>
            <p className="section-description">
              Here are some of the projects I've worked on to showcase my skills and creativity
            </p>
          </motion.div>

          <div className="projects-grid">
            {projects.map((project, index) => (
              <motion.div
                key={project.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="project-card"
              >
                <div className="project-image">
                  <img 
                    src={project.image} 
                    alt={project.title}
                    style={{
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover',
                      borderRadius: '8px'
                    }}
                    onError={(e) => {
                      e.target.style.display = 'none'
                      const fallback = e.target.nextSibling
                      if(fallback) fallback.style.display = 'flex'
                    }}
                  />
                  <div 
                    className="project-image-fallback"
                    style={{
                      display: 'none',
                      alignItems: 'center',
                      justifyContent: 'center',
                      width: '100%',
                      height: '100%',
                      backgroundColor: 'var(--muted)',
                      borderRadius: '8px'
                    }}
                  >
                    <Code size={48} className="project-image-icon" />
                  </div>
                </div>
                <div className="project-content">
                  <h3 className="project-title">{project.title}</h3>
                  <p className="project-description">
                    {project.description}
                  </p>
                  <div className="project-tech">
                    {project.technologies.map((tech) => (
                      <span
                        key={tech}
                        className="tech-tag"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                  <div className="project-links">
                    <a 
                      href={project.github} 
                      className="project-link"
                      target="_blank" 
                      rel="noopener noreferrer"
                      aria-label={`${project.title} GitHub Repository`}
                    >
                      <Github size={16} />
                      Github Link
                    </a>
                    {project.live && (
                      <a 
                        href={project.live} 
                        className="project-link"
                        target="_blank" 
                        rel="noopener noreferrer"
                        aria-label={`${project.title} Live Demo`}
                      >
                        <ExternalLink size={16} />
                        Live Demo
                      </a>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>


 {/* Contact Section */}
<section id="contact" className="section">
  <div className="contact-center">
 <div className="container">
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      viewport={{ once: true }}
      className="section-header"
    >
      <h2 className="section-title">Get In Touch</h2>
      <p className="section-description">
        I'm always open to discussing new opportunities and exciting projects. Let's connect!
      </p>
    </motion.div>

    <div className="contact-grid">
      <motion.div
        initial={{ opacity: 0, x: -30 }}
        whileInView={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
        className="contact-info-section"
      >
        <div className="contact-info-item">
          <div className="contact-info-icon">
            <Mail size={24} />
          </div>
          <div className="contact-info-content">
            <h3>Email</h3>
            <p>azikeshinye@gmail.com</p>
          </div>
        </div>

        <div className="contact-info-item">
          <div className="contact-info-icon">
            <Phone size={24} />
          </div>
          <div className="contact-info-content">
            <h3>Phone</h3>
            <p>+212 751-780853</p>
          </div>
        </div>

        <div className="contact-info-item">
          <div className="contact-info-icon">
            <MapPin size={24} />
          </div>
          <div className="contact-info-content">
            <h3>Location</h3>
            <p>Bab Cheffa Sale, Rabat</p>
            <p>Morocco.</p>
          </div>
        </div>

        <div className="social-links">
          <a href="https://github.com/samzik234?tab=repositories" className="social-link" target="_blank" rel="noreferrer">
            <Github size={24} />
          </a>
          <a href="https://github.com/simon-azike1" className="social-link" target="_blank" rel="noreferrer">
            <Github size={24} />
          </a>
          <a href="https://www.linkedin.com/in/simonzik/" className="social-link" target="_blank" rel="noreferrer">
            <Linkedin size={24} />
          </a>
          <a href="https://www.youtube.com/@SamzikTech" className="social-link" target="_blank" rel="noreferrer">
            <Youtube size={24} />
          </a>
          <a href="https://web.facebook.com/simon.azike/" className="social-link" target="_blank" rel="noreferrer">
            <Facebook size={24} />
          </a>
          <a href="https://x.com/SimonAzike75984" className="social-link" target="_blank" rel="noreferrer">
            <Instagram size={24} />
          </a>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, x: 30 }}
        whileInView={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
        className="contact-form"
      >
        <h3 className="form-title">Send me a message</h3>
        <form
          ref={form}
          onSubmit={handleSubmit}
          style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}
        >
          <div className="form-group">
            <label className="form-label">Name</label>
            <input
              type="text"
              name="user_name"
              className="form-input"
              placeholder="Your name"
              required
            />
          </div>
          <div className="form-group">
            <label className="form-label">Email</label>
            <input
              type="email"
              name="user_email"
              className="form-input"
              placeholder="your.email@example.com"
              required
            />
          </div>
          <div className="form-group">
            <label className="form-label">Message</label>
            <textarea
              className="form-textarea"
              name="message"
              placeholder="Your message..."
              required
            />
          </div>
          <button type="submit" className="form-submit">
            Send Message
          </button>
        </form>
      </motion.div>
    </div>
  </div>
  </div>
</section>


      {/* Footer */}
      <footer className="footer">
        <div className="container">
          <p className="footer-text">
            © 2025 Azike Simon. Built with React and plain CSS.
          </p>
        </div>
      </footer>

    </div>
  )
}

export default App