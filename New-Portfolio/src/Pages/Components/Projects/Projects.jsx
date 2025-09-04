import React from 'react';
import image1 from '@/assets/Images/baberShop.png';
import image2 from '@/assets/Images/movieMania.png';
import image3 from '@/assets/Images/TheRecipeBook.png';
import image4 from '@/assets/Images/DeHireVentures.png';
import image5 from '@/assets/Images/productM.png';
import image6 from '@/assets/Images/mercelLife.png';
import blogSiteImage from '@/assets/Images/blogPage.png';
import { motion } from 'framer-motion';
import { Code, Github, ExternalLink } from 'lucide-react'; 


function Projects() {
  const projects = [
    {
      title: "Barber Booking App",
      description:
        "An easy-to-use platform for customers to book grooming sessions, showcasing clean UI and responsive design.",
      image: image1,
      live: "https://barber-shop-web-app-mhma.vercel.app/",
      github: "https://github.com/simon-azike1/barberShopWebApp",
    },
    
    {
      title: "TheRecipeBook Web App",
      description:
        "A collection of recipes with category filters, ingredients, and steps. Built using vanilla JS and responsive CSS.",
      image: image3,
      live: "https://therecipebook-liard.vercel.app/",
      github: "https://github.com/simon-azike1/THERECIPEBOOK",
    },
    

     {
      title: "Mecel Life",
      description:"Mercel Life is a modern, responsive portfolio website for UX/UI designer built with React and Tailwind CSS.g.",
      image: image6,
      live: "https://mercel-life-9gdc.vercel.app/",
      github: "https://github.com/simon-azike1/Mercel-Life",
    },
    {
      title: "Product Management App",
      description:"A React application to manage products with features like add, view, search, and delete.  Designed for smooth user experience and easy inventory tracking.",
      image: image5,
      live: "https://product-management-app-kl4b.vercel.app/",
      github: "https://github.com/simon-azike1/product-management-app",
    },
    {
      title: "DeHireVentures",
      description:
        "Dynamic web application for a logistics company, featuring professional branding, a clean layout, and a recruitment management system",
      image: image4,
      live: "https://hrms-client-self.vercel.app/",
      github: "https://github.com/samzik234/HRMS",
    },
    
    {
      title: "Blog Website",
      description:
        "A simple blog layout created with HTML and CSS. Demonstrates understanding of modern layouts and typography.",
      image: blogSiteImage,
      live: "https://blog-page-sh5d.vercel.app/",
      github: "https://github.com/simon-azike1/Blog-Page",
    },

    {
      title: "MovieMania",
      description:
        "A movie database app using APIs to fetch and display movie details. Features search, filtering, and modern UI.",
      image: image2,
      live: "https://movie-mania-drab-six.vercel.app/",
      github: "https://github.com/samzik234/MovieMania",
    },
  ];

  return (
    <section className="projects-section"  id="projects">
      <h2 className="section-title">Featured Projects</h2>
      <p className= "section-description" style={{textAlign:"center", marginBottom:"3rem"}}>
Explore a curated collection of my recent projects that demonstrate a range of   skills from frontend design to full-stack development.  
        
      </p>
      <div className="projects-grid">
        {projects.map((project) => (
          <motion.div
            className="project-card"
            key={project.title}
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            <img
              src={project.image}
              alt={project.title}
              onError={(e) => (e.target.src = '/fallback.jpg')}
              className="project-image"
            />
            <div className="project-content">
              <h3>{project.title}</h3>
              <p>{project.description}</p>
              <div className="project-links">
                <a
                  href={project.live}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`View live site for ${project.title}`}
                >
                  <ExternalLink size={20} /> Live
                </a>
                <a
                  href={project.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`View source code for ${project.title}`}
                >
                  <Github size={20} /> Code
                </a>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

export default Projects;
