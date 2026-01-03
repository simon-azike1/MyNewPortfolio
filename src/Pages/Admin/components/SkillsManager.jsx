import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Edit, Trash2, Save, X } from 'lucide-react';
import { skillsAPI, adminSkillsAPI } from '../../../services/api';

const SkillsManager = () => {
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
      alert('Failed to load skills');
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
    if (window.confirm('Are you sure you want to delete this skill?')) {
      try {
        await adminSkillsAPI.delete(id);
        setSkills(skills.filter(s => s._id !== id));
      } catch (error) {
        console.error('Error deleting skill:', error);
        alert('Failed to delete skill');
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
      alert('Failed to save skill');
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

  const getLevelColor = (level) => {
    switch (level) {
      case 'Expert': return 'bg-green-500';
      case 'Advanced': return 'bg-blue-500';
      case 'Intermediate': return 'bg-yellow-500';
      case 'Beginner': return 'bg-red-500';
      default: return 'bg-gray-500';
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-dark">Skills Management</h2>
          <p className="text-gray-600">Manage your technical skills</p>
        </div>
        <button onClick={handleAddNew} className="btn btn-primary">
          <Plus size={20} />
          Add Skill
        </button>
      </div>

      {/* Skills Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {loading ? (
          <div className="col-span-2 text-center py-12 text-gray-500">Loading skills...</div>
        ) : skills.length === 0 ? (
          <div className="col-span-2 text-center py-12 text-gray-500">No skills yet. Add your first skill!</div>
        ) : (
          skills.map((skill) => (
            <motion.div
              key={skill._id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white rounded-xl shadow-sm p-6"
            >
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <h3 className="text-lg font-bold text-dark mb-2">{skill.name}</h3>
                  <div className="flex items-center gap-2 text-sm mb-2">
                    <span className={`px-2 py-1 text-white rounded text-xs ${getLevelColor(skill.level)}`}>
                      {skill.level}
                    </span>
                    <span className="text-gray-500">{skill.category}</span>
                    <span className="text-gray-400">•</span>
                    <span className="text-gray-500">{skill.experience}</span>
                  </div>
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => handleEdit(skill)}
                    className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
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
              <div className="relative h-2 bg-gray-200 rounded-full overflow-hidden">
                <div
                  className={`absolute inset-y-0 left-0 ${getLevelColor(skill.level)} rounded-full`}
                  style={{ width: `${skill.percentage}%` }}
                />
              </div>
              <p className="text-right text-sm text-gray-600 mt-1">{skill.percentage}%</p>
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
              className="bg-white rounded-2xl max-w-md w-full p-6"
            >
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-2xl font-bold text-dark">
                  {editingSkill ? 'Edit Skill' : 'Add New Skill'}
                </h3>
                <button
                  onClick={() => setShowModal(false)}
                  className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                >
                  <X size={24} />
                </button>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-dark mb-2">
                    Skill Name *
                  </label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                    placeholder="e.g., React.js"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-dark mb-2">
                    Category *
                  </label>
                  <select
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                    required
                  >
                    <option value="frontend">Frontend</option>
                    <option value="backend">Backend</option>
                    <option value="tools">Tools</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-dark mb-2">
                    Level *
                  </label>
                  <select
                    value={formData.level}
                    onChange={(e) => setFormData({ ...formData, level: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                    required
                  >
                    <option value="Beginner">Beginner</option>
                    <option value="Intermediate">Intermediate</option>
                    <option value="Advanced">Advanced</option>
                    <option value="Expert">Expert</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-dark mb-2">
                    Proficiency: {formData.percentage}%
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
                  <label className="block text-sm font-medium text-dark mb-2">
                    Experience *
                  </label>
                  <input
                    type="text"
                    value={formData.experience}
                    onChange={(e) => setFormData({ ...formData, experience: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                    placeholder="e.g., 2+ years"
                    required
                  />
                </div>

                <div className="flex gap-3 pt-4">
                  <button type="submit" className="flex-1 btn btn-primary">
                    <Save size={20} />
                    {editingSkill ? 'Update Skill' : 'Add Skill'}
                  </button>
                  <button
                    type="button"
                    onClick={() => setShowModal(false)}
                    className="flex-1 btn btn-outline"
                  >
                    Cancel
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