import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Edit, Trash2, Save, X } from 'lucide-react';
import { skillsAPI, adminSkillsAPI } from '../../../services/api';
import { useI18n } from '../../../context/I18nContext';

const SkillsManager = ({ quickAction }) => {
  const { t } = useI18n();
  const [skills, setSkills] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editingSkill, setEditingSkill] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    category: 'frontend',
    level: 'Beginner',
    percentage: 50,
    experience: '1+ years',
  });

  useEffect(() => {
    fetchSkills();
  }, []);

  const fetchSkills = async () => {
    try {
      setLoading(true);
      const data = await skillsAPI.getAll();
      setSkills(data);
    } catch (error) {
      console.error('Error fetching skills:', error);
      alert(t('admin.alerts.skillLoadFailed'));
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (skill) => {
    setEditingSkill(skill);
    setFormData({
      name: skill.name,
      category: skill.category,
      level: skill.level,
      percentage: skill.percentage,
      experience: skill.experience,
    });
    setShowModal(true);
  };

  const handleDelete = async (id) => {
    if (window.confirm(t('admin.alerts.skillDeleteConfirm'))) {
      try {
        await adminSkillsAPI.delete(id);
        setSkills(skills.filter(s => s._id !== id));
      } catch (error) {
        console.error('Error deleting skill:', error);
        alert(t('admin.alerts.skillDeleteFailed'));
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const skillData = {
      name: formData.name,
      category: formData.category,
      level: formData.level,
      percentage: parseInt(formData.percentage),
      experience: formData.experience,
    };

    try {
      if (editingSkill) {
        const updated = await adminSkillsAPI.update(editingSkill._id, skillData);
        setSkills(skills.map(s => s._id === editingSkill._id ? updated : s));
      } else {
        const newSkill = await adminSkillsAPI.create(skillData);
        setSkills([...skills, newSkill]);
      }

      setShowModal(false);
      setEditingSkill(null);
      setFormData({
        name: '',
        category: 'frontend',
        level: 'Beginner',
        percentage: 50,
        experience: '1+ years',
      });
    } catch (error) {
      console.error('Error saving skill:', error);
      alert(t('admin.alerts.skillSaveFailed'));
    }
  };

  const handleAddNew = () => {
    setEditingSkill(null);
    setFormData({
      name: '',
      category: 'frontend',
      level: 'Beginner',
      percentage: 50,
      experience: '1+ years',
    });
    setShowModal(true);
  };

  useEffect(() => {
    if (quickAction?.tab === 'skills') {
      handleAddNew();
    }
  }, [quickAction?.token]);

  const getLevelColor = (level) => {
    switch (level) {
      case 'Expert': return 'bg-primary-dark';
      case 'Advanced': return 'bg-primary';
      case 'Intermediate': return 'bg-primary-light';
      case 'Beginner': return 'bg-dark';
      default: return 'bg-theme-bg-tertiary';
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-theme-text-primary">{t('admin.skillsManage.title')}</h2>
          <p className="text-theme-text-secondary">{t('admin.skillsManage.subtitle')}</p>
        </div>
        <button onClick={handleAddNew} className="btn btn-primary">
          <Plus size={20} />
          {t('admin.skillsManage.add')}
        </button>
      </div>

      {/* Skills Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {loading ? (
          <div className="col-span-2 text-center py-12 text-theme-text-tertiary">{t('admin.skillsManage.loading')}</div>
        ) : skills.length === 0 ? (
          <div className="col-span-2 text-center py-12 text-theme-text-tertiary">{t('admin.skillsManage.empty')}</div>
        ) : (
          skills.map((skill) => (
            <motion.div
              key={skill._id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-theme-card rounded-xl shadow-sm p-6 border border-theme"
            >
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <h3 className="text-lg font-bold text-theme-text-primary mb-2">{skill.name}</h3>
                  <div className="flex items-center gap-2 text-sm mb-2">
                    <span className={`px-2 py-1 text-white rounded text-xs ${getLevelColor(skill.level)}`}>
                      {skill.level}
                    </span>
                    <span className="text-theme-text-tertiary">{skill.category}</span>
                    <span className="text-theme-text-tertiary">•</span>
                    <span className="text-theme-text-tertiary">{skill.experience}</span>
                  </div>
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => handleEdit(skill)}
                    className="p-2 text-theme-accent-primary hover:bg-theme-bg-secondary rounded-lg transition-colors"
                  >
                    <Edit size={18} />
                  </button>
                  <button
                    onClick={() => handleDelete(skill._id)}
                    className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                  >
                    <Trash2 size={18} />
                  </button>
                </div>
              </div>
              <div className="relative h-2 bg-theme-bg-secondary rounded-full overflow-hidden">
                <div
                  className={`absolute inset-y-0 left-0 ${getLevelColor(skill.level)} rounded-full`}
                  style={{ width: `${skill.percentage}%` }}
                />
              </div>
              <p className="text-right text-sm text-theme-text-tertiary mt-1">{skill.percentage}%</p>
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
              className="bg-theme-card rounded-2xl max-w-md w-full p-6 border border-theme"
            >
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-2xl font-bold text-theme-text-primary">
                  {editingSkill ? t('admin.skillsManage.edit') : t('admin.skillsManage.addNew')}
                </h3>
                <button
                  onClick={() => setShowModal(false)}
                  className="p-2 hover:bg-theme-bg-secondary rounded-lg transition-colors"
                >
                  <X size={24} />
                </button>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-theme-text-primary mb-2">
                    {t('admin.skillsManage.formName')} *
                  </label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-4 py-2 border border-theme rounded-lg focus:outline-none focus:ring-2 focus:ring-theme-accent-primary bg-theme-bg-primary text-theme-text-primary"
                    placeholder={t('admin.skillsManage.placeholderName')}
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-theme-text-primary mb-2">
                    {t('admin.skillsManage.formCategory')} *
                  </label>
                  <select
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                    className="w-full px-4 py-2 border border-theme rounded-lg focus:outline-none focus:ring-2 focus:ring-theme-accent-primary bg-theme-bg-primary text-theme-text-primary"
                    required
                  >
                    <option value="frontend">{t('admin.skillsManage.categoryFrontend')}</option>
                    <option value="backend">{t('admin.skillsManage.categoryBackend')}</option>
                    <option value="tools">{t('admin.skillsManage.categoryTools')}</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-theme-text-primary mb-2">
                    {t('admin.skillsManage.formLevel')} *
                  </label>
                  <select
                    value={formData.level}
                    onChange={(e) => setFormData({ ...formData, level: e.target.value })}
                    className="w-full px-4 py-2 border border-theme rounded-lg focus:outline-none focus:ring-2 focus:ring-theme-accent-primary bg-theme-bg-primary text-theme-text-primary"
                    required
                  >
                    <option value="Beginner">{t('admin.skillsManage.levelBeginner')}</option>
                    <option value="Intermediate">{t('admin.skillsManage.levelIntermediate')}</option>
                    <option value="Advanced">{t('admin.skillsManage.levelAdvanced')}</option>
                    <option value="Expert">{t('admin.skillsManage.levelExpert')}</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-theme-text-primary mb-2">
                    {t('admin.skillsManage.formProficiency')}: {formData.percentage}%
                  </label>
                  <input
                    type="range"
                    min="0"
                    max="100"
                    value={formData.percentage}
                    onChange={(e) => setFormData({ ...formData, percentage: e.target.value })}
                    className="w-full"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-theme-text-primary mb-2">
                    {t('admin.skillsManage.formExperience')} *
                  </label>
                  <input
                    type="text"
                    value={formData.experience}
                    onChange={(e) => setFormData({ ...formData, experience: e.target.value })}
                    className="w-full px-4 py-2 border border-theme rounded-lg focus:outline-none focus:ring-2 focus:ring-theme-accent-primary bg-theme-bg-primary text-theme-text-primary"
                    placeholder={t('admin.skillsManage.placeholderExperience')}
                    required
                  />
                </div>

                <div className="flex gap-3 pt-4">
                  <button type="submit" className="flex-1 btn btn-primary">
                    <Save size={20} />
                    {editingSkill ? t('admin.skillsManage.submitUpdate') : t('admin.skillsManage.submitAdd')}
                  </button>
                  <button
                    type="button"
                    onClick={() => setShowModal(false)}
                    className="flex-1 btn btn-outline"
                  >
                    {t('admin.skillsManage.cancel')}
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

export default SkillsManager;


