import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Github,
  ExternalLink,
} from 'lucide-react';
import { projectsAPI } from '../../services/api';

const Projects = () => {
  const [selectedProject, setSelectedProject] = useState(null);
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    try {
      setLoading(true);
      const data = await projectsAPI.getAll();
      setProjects(data);
    } catch (error) {
      console.error('Error fetching projects:', error);
    } finally {
      setLoading(false);
    }
  };

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
    <section id="projects" className="py-24 bg-theme-bg-secondary" aria-label="Portfolio Projects">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_2fr] gap-16 lg:gap-20 items-start">
          {/* Header */}
          <motion.header
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="lg:sticky lg:top-28"
          >
            <h2 className="text-4xl sm:text-5xl font-bold text-theme-text-primary mb-4">
              Selected <span className="text-theme-accent-primary">Work</span>
            </h2>
            <p className="text-lg text-theme-text-secondary max-w-2xl">
              A curated selection of projects showcasing web development expertise across frontend and full-stack solutions.
            </p>
            <div className="mt-6 space-y-4 text-theme-text-secondary">
              <p className="text-sm uppercase tracking-[0.2em] text-theme-text-tertiary">What you will find</p>
              <ul className="space-y-3">
                <li className="flex items-start gap-3">
                  <span className="mt-2 h-2 w-2 rounded-full bg-theme-accent-primary"></span>
                  <span>Product-focused builds with clean UX and maintainable architecture.</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="mt-2 h-2 w-2 rounded-full bg-theme-accent-primary"></span>
                  <span>Full-stack integrations, APIs, and performance-focused optimizations.</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="mt-2 h-2 w-2 rounded-full bg-theme-accent-primary"></span>
                  <span>Production-ready designs and documentation for smooth handoffs.</span>
                </li>
              </ul>
            </div>
          </motion.header>

          {/* Projects */}
          <div>
            {loading ? (
              <div className="text-center py-12 text-theme-text-tertiary">Loading projects...</div>
            ) : projects.length === 0 ? (
              <div className="text-center py-12 text-theme-text-tertiary">No projects available yet.</div>
            ) : (
              <motion.div
                variants={containerVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                className="grid grid-cols-1 md:grid-cols-2 gap-10"
              >
                {projects.map((project) => (
                  <motion.article
                    key={project._id}
                    variants={itemVariants}
                    className="bg-theme-card rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-shadow duration-300 cursor-pointer group border border-theme"
                    onClick={() => setSelectedProject(project)}
                  >
                    <div className="relative overflow-hidden aspect-video">
                      <img
                        src={project.image}
                        alt={`${project.title} project preview`}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                        loading="lazy"
                      />
                      <div className="absolute inset-0 bg-dark/80 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-4">
                        {project.liveUrl && (
                          <a
                            href={project.liveUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="w-12 h-12 bg-theme-card rounded-full flex items-center justify-center text-theme-accent-primary hover:bg-theme-accent-primary hover:text-white transition-colors"
                            aria-label={`View ${project.title} live`}
                            onClick={(e) => e.stopPropagation()}
                          >
                            <ExternalLink size={18} />
                          </a>
                        )}
                        {project.githubUrl && (
                          <a
                            href={project.githubUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="w-12 h-12 bg-theme-card rounded-full flex items-center justify-center text-theme-accent-primary hover:bg-theme-accent-primary hover:text-white transition-colors"
                            aria-label={`View ${project.title} source code`}
                            onClick={(e) => e.stopPropagation()}
                          >
                            <Github size={18} />
                          </a>
                        )}
                      </div>
                    </div>

                    <div className="p-6 space-y-4">
                      <div className="flex items-center justify-between text-sm">
                        <span className="px-3 py-1 bg-theme-bg-tertiary text-theme-accent-primary rounded-full font-medium border border-theme">{project.category}</span>
                        {project.featured && (
                          <span className="px-3 py-1 bg-theme-bg-tertiary text-theme-accent-secondary rounded-full font-medium border border-theme">Featured</span>
                        )}
                      </div>

                      <h3 className="text-xl font-bold text-theme-text-primary">{project.title}</h3>
                      <p className="text-theme-text-secondary text-sm leading-relaxed">{project.description.substring(0, 120)}...</p>

                      <div className="flex flex-wrap gap-2">
                        {project.technologies.slice(0, 3).map((tech, index) => (
                          <span key={index} className="px-3 py-1 bg-theme-bg-secondary text-theme-text-secondary rounded-md text-xs font-medium border border-theme">
                            {tech}
                          </span>
                        ))}
                        {project.technologies.length > 3 && (
                          <span className="px-3 py-1 bg-theme-bg-secondary text-theme-text-secondary rounded-md text-xs font-medium border border-theme">+{project.technologies.length - 3}</span>
                        )}
                      </div>
                    </div>
                  </motion.article>
                ))}
              </motion.div>
            )}
          </div>
        </div>

        {/* Case Study Modal */}
        <AnimatePresence>
          {selectedProject && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-dark/80 z-50 flex items-center justify-center p-4 backdrop-blur-sm"
              onClick={() => setSelectedProject(null)}
            >
              <motion.div
                initial={{ scale: 0.9, y: 50 }}
                animate={{ scale: 1, y: 0 }}
                exit={{ scale: 0.9, y: 50 }}
                className="bg-theme-card rounded-2xl max-w-3xl w-full max-h-[90vh] overflow-y-auto relative border border-theme"
                onClick={(e) => e.stopPropagation()}
              >
                <button
                  className="absolute top-4 right-4 w-10 h-10 bg-theme-bg-secondary hover:bg-theme-bg-tertiary rounded-full flex items-center justify-center text-2xl text-theme-text-secondary hover:text-theme-text-primary transition-colors z-10"
                  onClick={() => setSelectedProject(null)}
                  aria-label="Close project details"
                >
                  ✕
                </button>

                <div className="aspect-video overflow-hidden rounded-t-2xl">
                  <img
                    src={selectedProject.image}
                    alt={selectedProject.title}
                    className="w-full h-full object-cover"
                  />
                </div>

                <div className="p-8 space-y-6">
                  <div>
                    <h3 className="text-3xl font-bold text-theme-text-primary mb-2">{selectedProject.title}</h3>
                    <div className="flex items-center gap-2 text-theme-text-tertiary">
                      <span className="px-3 py-1 bg-theme-bg-tertiary text-theme-accent-primary rounded-full text-sm font-medium border border-theme">{selectedProject.category}</span>
                      {selectedProject.featured && (
                        <>
                          <span>•</span>
                          <span className="text-theme-accent-secondary">Featured</span>
                        </>
                      )}
                    </div>
                  </div>

                  <div className="space-y-4">
                    <h4 className="text-xl font-bold text-theme-text-primary">Overview</h4>
                    <p className="text-theme-text-secondary leading-relaxed">{selectedProject.description}</p>

                    <h4 className="text-xl font-bold text-theme-text-primary pt-4">Technologies</h4>
                    <div className="flex flex-wrap gap-2">
                      {selectedProject.technologies.map((tech, index) => (
                        <span key={index} className="px-4 py-2 bg-theme-bg-secondary text-theme-text-secondary rounded-lg text-sm font-medium border border-theme">
                          {tech}
                        </span>
                      ))}
                    </div>

                    <div className="flex flex-wrap gap-4 pt-6">
                      {selectedProject.liveUrl && (
                        <a
                          href={selectedProject.liveUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="btn btn-primary"
                        >
                          <ExternalLink size={18} />
                          View Live Site
                        </a>
                      )}
                      {selectedProject.githubUrl && (
                        <a
                          href={selectedProject.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="btn btn-outline"
                      >
                        <Github size={18} />
                        View Code
                      </a>
                      )}
                    </div>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
};

export default Projects;
