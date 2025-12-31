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
    <section id="projects" className="py-24 bg-gray-50" aria-label="Portfolio Projects">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        {/* Header */}
        <motion.header
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl sm:text-5xl font-bold text-dark mb-4">
            Selected <span className="text-primary">Work</span>
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            A curated selection of projects showcasing web development expertise across frontend and full-stack solutions.
          </p>
        </motion.header>

        {/* Projects */}
        {loading ? (
          <div className="text-center py-12 text-gray-500">Loading projects...</div>
        ) : projects.length === 0 ? (
          <div className="text-center py-12 text-gray-500">No projects available yet.</div>
        ) : (
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {projects.map((project) => (
              <motion.article
                key={project._id}
                variants={itemVariants}
                className="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-shadow duration-300 cursor-pointer group"
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
                        className="w-12 h-12 bg-white rounded-full flex items-center justify-center text-primary hover:bg-primary hover:text-white transition-colors"
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
                        className="w-12 h-12 bg-white rounded-full flex items-center justify-center text-primary hover:bg-primary hover:text-white transition-colors"
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
                  <span className="px-3 py-1 bg-blue-50 text-primary rounded-full font-medium">{project.category}</span>
                  {project.featured && (
                    <span className="px-3 py-1 bg-yellow-50 text-yellow-700 rounded-full font-medium">Featured</span>
                  )}
                </div>

                <h3 className="text-xl font-bold text-dark">{project.title}</h3>
                <p className="text-gray-600 text-sm leading-relaxed">{project.description.substring(0, 120)}...</p>

                <div className="flex flex-wrap gap-2">
                  {project.technologies.slice(0, 3).map((tech, index) => (
                    <span key={index} className="px-3 py-1 bg-gray-100 text-gray-700 rounded-md text-xs font-medium">
                      {tech}
                    </span>
                  ))}
                  {project.technologies.length > 3 && (
                    <span className="px-3 py-1 bg-gray-100 text-gray-700 rounded-md text-xs font-medium">+{project.technologies.length - 3}</span>
                  )}
                </div>
              </div>
            </motion.article>
          ))}
          </motion.div>
        )}

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
                className="bg-white rounded-2xl max-w-3xl w-full max-h-[90vh] overflow-y-auto relative"
                onClick={(e) => e.stopPropagation()}
              >
                <button
                  className="absolute top-4 right-4 w-10 h-10 bg-gray-100 hover:bg-gray-200 rounded-full flex items-center justify-center text-2xl text-gray-600 hover:text-dark transition-colors z-10"
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
                    <h3 className="text-3xl font-bold text-dark mb-2">{selectedProject.title}</h3>
                    <div className="flex items-center gap-2 text-gray-500">
                      <span className="px-3 py-1 bg-blue-50 text-primary rounded-full text-sm font-medium">{selectedProject.category}</span>
                      {selectedProject.featured && (
                        <>
                          <span>•</span>
                          <span className="text-yellow-600">Featured</span>
                        </>
                      )}
                    </div>
                  </div>

                  <div className="space-y-4">
                    <h4 className="text-xl font-bold text-dark">Overview</h4>
                    <p className="text-gray-600 leading-relaxed">{selectedProject.description}</p>

                    <h4 className="text-xl font-bold text-dark pt-4">Technologies</h4>
                    <div className="flex flex-wrap gap-2">
                      {selectedProject.technologies.map((tech, index) => (
                        <span key={index} className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg text-sm font-medium">
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
