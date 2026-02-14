import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Edit, Trash2, Save, X, ExternalLink, Github } from 'lucide-react';
import { projectsAPI, adminProjectsAPI } from '../../../services/api';
import { useI18n } from '../../../context/I18nContext';

const ProjectsManager = ({ quickAction }) => {
  const { t } = useI18n();
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editingProject, setEditingProject] = useState(null);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    image: '',
    liveUrl: '',
    githubUrl: '',
    category: 'web',
    technologies: '',
    featured: false,
  });

  // Fetch projects on component mount
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
      alert(t('admin.alerts.projectLoadFailed'));
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (project) => {
    setEditingProject(project);
    setFormData({
      title: project.title,
      description: project.description,
      image: project.image,
      liveUrl: project.liveUrl,
      githubUrl: project.githubUrl,
      category: project.category,
      technologies: project.technologies.join(', '),
      featured: project.featured || false,
    });
    setShowModal(true);
  };

  const handleDelete = async (id) => {
    if (window.confirm(t('admin.alerts.projectDeleteConfirm'))) {
      try {
        await adminProjectsAPI.delete(id);
        setProjects(projects.filter(p => p._id !== id));
      } catch (error) {
        console.error('Error deleting project:', error);
        alert(t('admin.alerts.projectDeleteFailed'));
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const projectData = {
      title: formData.title,
      description: formData.description,
      image: formData.image,
      liveUrl: formData.liveUrl,
      githubUrl: formData.githubUrl,
      category: formData.category,
      technologies: formData.technologies.split(',').map(t => t.trim()),
      featured: formData.featured,
    };

    try {
      if (editingProject) {
        const updated = await adminProjectsAPI.update(editingProject._id, projectData);
        setProjects(projects.map(p => p._id === editingProject._id ? updated : p));
      } else {
        const newProject = await adminProjectsAPI.create(projectData);
        setProjects([...projects, newProject]);
      }

      setShowModal(false);
      setEditingProject(null);
      setFormData({
        title: '',
        description: '',
        image: '',
        liveUrl: '',
        githubUrl: '',
        category: 'web',
        technologies: '',
        featured: false,
      });
    } catch (error) {
      console.error('Error saving project:', error);
      alert(t('admin.alerts.projectSaveFailed'));
    }
  };

  const handleAddNew = () => {
    setEditingProject(null);
    setFormData({
      title: '',
      description: '',
      image: '',
      liveUrl: '',
      githubUrl: '',
      category: 'web',
      technologies: '',
      featured: false,
    });
    setShowModal(true);
  };

  useEffect(() => {
    if (quickAction?.tab === 'projects') {
      handleAddNew();
    }
  }, [quickAction?.token]);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-theme-text-primary">{t('admin.projects.title')}</h2>
          <p className="text-theme-text-secondary">{t('admin.projects.subtitle')}</p>
        </div>
        <button
          onClick={handleAddNew}
          className="btn btn-primary"
        >
          <Plus size={20} />
          {t('admin.projects.add')}
        </button>
      </div>

      {/* Projects List */}
      <div className="space-y-4">
        {loading ? (
          <div className="text-center py-12 text-theme-text-tertiary">{t('admin.projects.loading')}</div>
        ) : projects.length === 0 ? (
          <div className="text-center py-12 text-theme-text-tertiary">{t('admin.projects.empty')}</div>
        ) : (
          projects.map((project) => (
            <motion.div
              key={project._id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-theme-card rounded-xl shadow-sm p-6 border border-theme"
            >
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-3">
                    <h3 className="text-xl font-bold text-theme-text-primary">{project.title}</h3>
                    <span className="px-3 py-1 bg-theme-bg-tertiary text-theme-accent-primary rounded-full text-sm font-medium border border-theme">
                      {project.category}
                    </span>
                    {project.featured && (
                      <span className="px-3 py-1 bg-theme-bg-tertiary text-theme-accent-secondary rounded-full text-sm border border-theme">
                        {t('admin.projects.featured')}
                      </span>
                    )}
                  </div>
                  <p className="text-theme-text-secondary mb-4">{project.description}</p>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.technologies.map((tech, index) => (
                      <span
                        key={index}
                        className="px-2 py-1 bg-theme-bg-secondary text-theme-text-secondary rounded text-xs border border-theme"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                  <div className="flex items-center gap-4 text-sm">
                    {project.liveUrl && (
                      <a
                        href={project.liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-1 text-theme-accent-primary hover:underline"
                      >
                        <ExternalLink size={16} />
                        {t('admin.projects.liveDemo')}
                      </a>
                    )}
                    {project.githubUrl && (
                      <a
                        href={project.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-1 text-theme-accent-primary hover:underline"
                      >
                        <Github size={16} />
                        {t('admin.projects.sourceCode')}
                      </a>
                    )}
                  </div>
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => handleEdit(project)}
                    className="p-2 text-theme-accent-primary hover:bg-theme-bg-secondary rounded-lg transition-colors"
                  >
                    <Edit size={20} />
                  </button>
                  <button
                    onClick={() => handleDelete(project._id)}
                    className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                  >
                    <Trash2 size={20} />
                  </button>
                </div>
              </div>
            </motion.div>
          ))
        )}
      </div>

      {/* Add/Edit Modal */}
      <AnimatePresence>
        {showModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-dark/50 z-50 flex items-center justify-center p-4"
            onClick={() => setShowModal(false)}
          >
            <motion.div
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-theme-card rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto p-6 border border-theme"
            >
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-2xl font-bold text-theme-text-primary">
                  {editingProject ? t('admin.projects.edit') : t('admin.projects.addNew')}
                </h3>
                <button
                  onClick={() => setShowModal(false)}
                  className="p-2 hover:bg-theme-bg-secondary rounded-lg transition-colors"
                >
                  <X size={24} />
                </button>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-theme-text-primary mb-2">
                      {t('admin.projects.formTitle')} *
                    </label>
                    <input
                      type="text"
                      value={formData.title}
                      onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                      className="w-full px-4 py-2 border border-theme rounded-lg focus:outline-none focus:ring-2 focus:ring-theme-accent-primary bg-theme-bg-primary text-theme-text-primary"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-theme-text-primary mb-2">
                      {t('admin.projects.formCategory')} *
                    </label>
                    <select
                      value={formData.category}
                      onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                      className="w-full px-4 py-2 border border-theme rounded-lg focus:outline-none focus:ring-2 focus:ring-theme-accent-primary bg-theme-bg-primary text-theme-text-primary"
                      required
                    >
                      <option value="web">{t('admin.projects.categoryWeb')}</option>
                      <option value="mobile">{t('admin.projects.categoryMobile')}</option>
                      <option value="design">{t('admin.projects.categoryDesign')}</option>
                      <option value="other">{t('admin.projects.categoryOther')}</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-theme-text-primary mb-2">
                    {t('admin.projects.formDescription')} *
                  </label>
                  <textarea
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    className="w-full px-4 py-2 border border-theme rounded-lg focus:outline-none focus:ring-2 focus:ring-theme-accent-primary resize-none bg-theme-bg-primary text-theme-text-primary"
                    rows="4"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-theme-text-primary mb-2">
                    {t('admin.projects.formImage')} *
                  </label>
                    <input
                      type="url"
                      value={formData.image}
                      onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                      className="w-full px-4 py-2 border border-theme rounded-lg focus:outline-none focus:ring-2 focus:ring-theme-accent-primary bg-theme-bg-primary text-theme-text-primary"
                      placeholder={t('admin.projects.placeholderImage')}
                      required
                    />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-theme-text-primary mb-2">
                      {t('admin.projects.formLive')}
                    </label>
                    <input
                      type="url"
                      value={formData.liveUrl}
                      onChange={(e) => setFormData({ ...formData, liveUrl: e.target.value })}
                      className="w-full px-4 py-2 border border-theme rounded-lg focus:outline-none focus:ring-2 focus:ring-theme-accent-primary bg-theme-bg-primary text-theme-text-primary"
                      placeholder={t('admin.projects.placeholderLive')}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-theme-text-primary mb-2">
                      {t('admin.projects.formGithub')}
                    </label>
                    <input
                      type="url"
                      value={formData.githubUrl}
                      onChange={(e) => setFormData({ ...formData, githubUrl: e.target.value })}
                      className="w-full px-4 py-2 border border-theme rounded-lg focus:outline-none focus:ring-2 focus:ring-theme-accent-primary bg-theme-bg-primary text-theme-text-primary"
                      placeholder={t('admin.projects.placeholderGithub')}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-theme-text-primary mb-2">
                      {t('admin.projects.formTech')} *
                    </label>
                    <input
                      type="text"
                      value={formData.technologies}
                      onChange={(e) => setFormData({ ...formData, technologies: e.target.value })}
                      className="w-full px-4 py-2 border border-theme rounded-lg focus:outline-none focus:ring-2 focus:ring-theme-accent-primary bg-theme-bg-primary text-theme-text-primary"
                      placeholder={t('admin.projects.placeholderTech')}
                      required
                    />
                  </div>
                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      id="featured"
                      checked={formData.featured}
                      onChange={(e) => setFormData({ ...formData, featured: e.target.checked })}
                      className="w-4 h-4 text-theme-accent-primary focus:ring-2 focus:ring-theme-accent-primary border-theme rounded"
                    />
                    <label htmlFor="featured" className="ml-2 text-sm font-medium text-theme-text-primary">
                      {t('admin.projects.formFeatured')}
                    </label>
                  </div>
                </div>

                <div className="flex gap-3 pt-4">
                  <button type="submit" className="flex-1 btn btn-primary">
                    <Save size={20} />
                    {editingProject ? t('admin.projects.submitUpdate') : t('admin.projects.submitAdd')}
                  </button>
                  <button
                    type="button"
                    onClick={() => setShowModal(false)}
                    className="flex-1 btn btn-outline"
                  >
                    {t('admin.projects.cancel')}
                  </button>
                </div>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ProjectsManager;
