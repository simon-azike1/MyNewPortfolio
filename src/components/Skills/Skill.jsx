import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { skillsAPI } from '../../services/api';

const Skills = () => {
  const [activeCategory, setActiveCategory] = useState('all');
  const [skills, setSkills] = useState([]);
  const [loading, setLoading] = useState(true);

  const categories = [
    { id: 'all', name: 'All' },
    { id: 'frontend', name: 'Frontend' },
    { id: 'backend', name: 'Backend' },
    { id: 'tools', name: 'Tools' }
  ];

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
    } finally {
      setLoading(false);
    }
  };

  const filteredSkills = activeCategory === 'all'
    ? skills
    : skills.filter(skill => skill.category === activeCategory);

  const getLevelColor = (level) => {
    switch (level) {
      case 'Expert': return '#10b981';
      case 'Advanced': return '#3b82f6';
      case 'Intermediate': return '#f59e0b';
      case 'Beginner': return '#ef4444';
      default: return '#6b7280';
    }
  };

  return (
    <section id="skills" className="py-24 bg-theme-bg-primary">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl sm:text-5xl font-bold text-theme-text-primary mb-4">
            Skills & <span className="text-theme-accent-primary">Technologies</span>
          </h2>
          <p className="text-lg text-theme-text-secondary max-w-2xl mx-auto">
            Technical expertise across frontend, backend, and development tools.
          </p>
        </motion.div>

        {/* Category Filter */}
        <div className="flex flex-wrap justify-center gap-3 mb-12">
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => setActiveCategory(category.id)}
              className={`px-6 py-2 rounded-full font-medium transition-all duration-300 ${
                activeCategory === category.id
                  ? 'bg-theme-accent-primary text-white shadow-lg'
                  : 'bg-theme-bg-secondary text-theme-text-secondary hover:bg-theme-card-hover border border-theme'
              }`}
            >
              {category.name}
            </button>
          ))}
        </div>

        {/* Skills Grid */}
        {loading ? (
          <div className="text-center py-12 text-theme-text-tertiary">Loading skills...</div>
        ) : filteredSkills.length === 0 ? (
          <div className="text-center py-12 text-theme-text-tertiary">No skills available yet.</div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredSkills.map((skill, index) => (
              <motion.div
                key={skill._id}
                className="bg-theme-card border border-theme rounded-xl p-6 hover:shadow-lg transition-shadow duration-300"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <h3 className="text-xl font-bold text-theme-text-primary mb-2">{skill.name}</h3>
                    <div className="flex items-center gap-2 text-sm">
                      <span className="font-medium" style={{ color: getLevelColor(skill.level) }}>
                        {skill.level}
                      </span>
                      <span className="text-theme-text-tertiary">•</span>
                      <span className="text-theme-text-tertiary">{skill.experience}</span>
                    </div>
                  </div>
                  <div className="text-2xl font-bold text-theme-accent-primary">{skill.percentage}%</div>
                </div>

                <div className="relative h-2 bg-theme-bg-secondary rounded-full overflow-hidden">
                  <motion.div
                    className="absolute inset-y-0 left-0 rounded-full"
                    style={{
                      width: `${skill.percentage}%`,
                      backgroundColor: getLevelColor(skill.level)
                    }}
                    initial={{ width: 0 }}
                    whileInView={{ width: `${skill.percentage}%` }}
                    transition={{ duration: 1, delay: index * 0.1 }}
                    viewport={{ once: true }}
                  />
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default Skills;