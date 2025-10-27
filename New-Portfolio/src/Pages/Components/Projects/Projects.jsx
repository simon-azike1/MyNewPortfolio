import React from 'react';
import { motion } from 'framer-motion';
import { 
  Code, 
  Github, 
  ExternalLink, 
  Eye, 
  Star, 
  Calendar,
  Tag,
} from 'lucide-react';

// Import images
import image1 from '@/assets/Images/baberShop.png';
import image2 from '@/assets/Images/movieMania.png';
import image3 from '@/assets/Images/TheRecipeBook.png';
import image4 from '@/assets/Images/DeHireVentures.png';
import image5 from '@/assets/Images/productM.png';
import image6 from '@/assets/Images/mercelLife2.png';
import image10 from '@/assets/Images/UtilApp.png';
import image11 from '@/assets/Images/ChetroApp.png';
import image12 from '@/assets/Images/YACSN.png';

const Projects = () => {
  const projects = [
    {
      id: 1,
      title: "YACSN",
      description:
        "YACSN is a modern, fully responsive corporate website developed with WordPress for York Air Conditioning's official representative in Nigeria. Designed to strengthen brand presence, improve user engagement, and showcase products and dealer information with a clean, professional interface.",
      image: image12,
      live: "https://yacsn.com/",
      github: "https://github.com/simon-azike1",
      category: "WordPress",
      technologies: ["WordPress", "HTML", "CSS", "JavaScript", "PHP"],
      featured: true,
      year: "2024",
      status: "Completed",
    },
    {
      id: 2,
      title: "Barber Booking App",
      description:
        "A full-stack web app for booking grooming sessions and managing appointments online. Built with React, Node.js, and MongoDB for smooth, responsive performance.",
      image: image1,
      live: "https://barber-shop-web-app-mhma.vercel.app/",
      github: "https://github.com/simon-azike1/barberShopWebApp",
      category: "Full Stack",
      technologies: ["React", "Node.js", "MongoDB", "CSS"],
      featured: true,
      year: "2024",
      status: "Completed",
    },
    {
      id: 3,
      title: "Mercel Life",
      description:
        "A modern and responsive portfolio website for a UX/UI designer, built with React and Tailwind CSS to showcase projects and design work beautifully.",
      image: image6,
      live: "https://mercel-life.vercel.app/",
      github: "https://github.com/simon-azike1/Mercel-Life",
      category: "Frontend",
      technologies: ["React", "Tailwind CSS", "Framer Motion"],
      featured: false,
      year: "2025",
      status: "Completed",
    },
    {
      id: 4,
      title: "The Recipe Book",
      description:
        "A web app that displays categorized recipes with ingredients and steps. Built using Vanilla JavaScript and responsive CSS.",
      image: image3,
      live: "https://therecipebook-liard.vercel.app/",
      github: "https://github.com/simon-azike1/THERECIPEBOOK",
      category: "Frontend",
      technologies: ["JavaScript", "CSS", "HTML", "API"],
      featured: true,
      year: "2023",
      status: "Completed",
    },
    {
      id: 5,
      title: "Chetro",
      description:
        "Chetro is a task management app that helps users organize and categorize daily activities efficiently for better productivity.",
      image: image11,
      live: "https://task-management-app-omega-flax.vercel.app/",
      github: "https://github.com/simon-azike1/Blog-Page",
      category: "Frontend",
      technologies: ["HTML", "CSS", "JavaScript"],
      featured: false,
      year: "2025",
      status: "Completed",
    },
    {
      id: 6,
      title: "Util",
      description:
        "Util is a house utility management system that automates budgeting, expense tracking, and contributions for shared apartments. Built from personal experience managing utilities manually.",
      image: image10,
      live: "https://house-utility-app.vercel.app/",
      github: "https://github.com/simon-azike1/HouseUtility-App",
      category: "Full Stack",
      technologies: ["React", "API", "CSS", "JavaScript"],
      featured: true,
      year: "2025",
      status: "Completed",
    },
    {
      id: 7,
      title: "DeHire Ventures",
      description:
        "A dynamic web application for a logistics company featuring recruitment management and modern branding built with React and MongoDB.",
      image: image4,
      live: "https://hrms-client-self.vercel.app/",
      github: "https://github.com/samzik234/HRMS",
      category: "Full Stack",
      technologies: ["React", "Node.js", "Express", "MongoDB"],
      featured: true,
      year: "2022",
      status: "Completed",
    },
    {
      id: 8,
      title: "Product Management App",
      description:
        "A React-based inventory management system with product addition, viewing, searching, and deletion features.",
      image: image5,
      live: "https://product-management-app-kl4b.vercel.app/",
      github: "https://github.com/simon-azike1/product-management-app",
      category: "Full Stack",
      technologies: ["React", "Firebase", "CSS", "JavaScript"],
      featured: true,
      year: "2024",
      status: "Completed",
    },
    {
      id: 9,
      title: "MovieMania",
      description:
        "A movie database app that fetches and displays movie details via API, with search and filtering options in a clean UI.",
      image: image2,
      live: "https://movie-mania-drab-six.vercel.app/",
      github: "https://github.com/samzik234/MovieMania",
      category: "Frontend",
      technologies: ["HTML", "CSS", "JavaScript"],
      featured: true,
      year: "2023",
      status: "Completed",
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1, delayChildren: 0.2 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" },
    },
  };

  return (
    <section id="projects" className="projects-section" aria-label="Portfolio Projects">
      <div className="projects-container">
        {/* Header */}
        <motion.header
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="projects-header"
        >
          <div className="section-badge">
            <Code size={16} aria-hidden="true" />
            Portfolio
          </div>
          <h2 className="section-title">
            Featured <span className="title-highlight">Projects</span>
          </h2>
          <p className="section-subtitle">
            Explore a curated selection of my web development projects — from front-end design to full-stack systems.
          </p>
        </motion.header>

        {/* Projects */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="projects-grid"
        >
          {projects.map((project) => (
            <motion.article
              key={project.id}
              variants={itemVariants}
              className={`project-card ${project.featured ? "featured" : ""}`}
            >
              <div className="project-image-container">
                <img
                  src={project.image}
                  alt={`${project.title} project preview`}
                  className="project-image"
                  loading="lazy"
                />
                <div className="project-overlay">
                  <div className="project-actions">
                    <a
                      href={project.live}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="project-action-btn primary"
                      aria-label={`View ${project.title} live`}
                    >
                      <ExternalLink size={18} />
                    </a>
                    <a
                      href={project.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="project-action-btn secondary"
                      aria-label={`View ${project.title} source code`}
                    >
                      <Github size={18} />
                    </a>
                  </div>
                </div>

                <div className="project-badges">
                  {project.featured && (
                    <div className="project-badge featured">
                      <Star size={12} />
                      Featured
                    </div>
                  )}
                  <div className="project-badge status">{project.status}</div>
                </div>
              </div>

              <div className="project-content">
                <div className="project-meta">
                  <div className="project-category">
                    <Tag size={12} />
                    {project.category}
                  </div>
                  <div className="project-year">
                    <Calendar size={12} />
                    {project.year}
                  </div>
                </div>

                <h3 className="project-title">{project.title}</h3>
                <p className="project-description">{project.description}</p>

                <div className="project-technologies">
                  {project.technologies.map((tech, index) => (
                    <span key={index} className="tech-tag">
                      {tech}
                    </span>
                  ))}
                </div>

                <div className="project-links">
                  <a
                    href={project.live}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="project-link primary"
                  >
                    <Eye size={16} />
                    Live Demo
                  </a>
                  <a
                    href={project.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="project-link secondary"
                  >
                    <Github size={16} />
                    Source Code
                  </a>
                </div>
              </div>
            </motion.article>
          ))}
        </motion.div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="projects-stats"
        >
          <div className="stat-item">
            <span className="stat-number">{projects.length}</span>
            <span className="stat-label">Total Projects</span>
          </div>
          <div className="stat-item">
            <span className="stat-number">
              {projects.filter((p) => p.featured).length}
            </span>
            <span className="stat-label">Featured Works</span>
          </div>
          <div className="stat-item">
            <span className="stat-number">
              {new Set(projects.flatMap((p) => p.technologies)).size}
            </span>
            <span className="stat-label">Technologies Used</span>
          </div>
          <div className="stat-item">
            <span className="stat-number">100%</span>
            <span className="stat-label">Completion Rate</span>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Projects;
