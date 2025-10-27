import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  Code,
  Database,
  Palette,
  Settings,
  Star,
  Calendar,
  Award,
  TrendingUp,
  CheckCircle,
  Clock,
  Target,
  Zap,
  Wrench,
  Monitor,
  Package,
  Terminal
} from 'lucide-react';

const Skills = () => {
  const [activeCategory, setActiveCategory] = useState('all');

  const categories = [
    { id: 'all', name: 'All Skills', icon: Target },
    { id: 'frontend', name: 'Frontend', icon: Monitor },
    { id: 'backend', name: 'Backend', icon: Database },
    { id: 'tools', name: 'Tools & Others', icon: Wrench }
  ];

  const skills = [
    {
      id: 1,
      name: 'JavaScript',
      category: 'frontend',
      level: 'Intermediate',
      percentage: 50,
      experience: '3+ years',
      icon: '🟨',
      description: 'Modern ES6+ JavaScript, async/await, DOM manipulation, and advanced concepts.',
      projects: 15,
      lastUsed: '2025',
      trending: true
    },
    {
      id: 2,
      name: 'React.js',
      category: 'frontend',
      level: 'Intermediate',
      percentage: 65,
      experience: '2+ years',
      icon: '⚛️',
      description: 'Component-based architecture, hooks, context API, and state management.',
      projects: 20,
      lastUsed: '2025',
      trending: true
    },
    {
      id: 3,
      name: 'HTML5',
      category: 'frontend',
      level: 'Expert',
      percentage: 75,
      experience: '3+ years',
      icon: '🌐',
      description: 'Semantic HTML, accessibility best practices, and modern web standards.',
      projects: 20,
      lastUsed: '2025',
      trending: false
    },
    {
      id: 4,
      name: 'CSS3',
      category: 'frontend',
      level: 'Advanced',
      percentage: 70,
      experience: '3+ years',
      icon: '🎨',
      description: 'Flexbox, Grid, animations, responsive design, and CSS preprocessors.',
      projects: 18,
      lastUsed: '2024',
      trending: false
    },
    {
      id: 5,
      name: 'Node.js',
      category: 'backend',
      level: 'Intermediate',
      percentage: 75,
      experience: '2+ years',
      icon: '🟢',
      description: 'Server-side JavaScript, Express.js, RESTful APIs, and npm ecosystem.',
      projects: 6,
      lastUsed: '2025',
      trending: true
    },
    {
      id: 6,
      name: 'Git & GitHub',
      category: 'tools',
      level: 'Advanced',
      percentage: 85,
      experience: '3+ years',
      icon: '📚',
      description: 'Version control, branching strategies, collaboration, and CI/CD workflows.',
      projects: 70,
      lastUsed: '2025',
      trending: false
    },
    {
      id: 7,
      name: 'MongoDB',
      category: 'backend',
      level: 'Intermediate',
      percentage: 65,
      experience: '1+ years',
      icon: '🍃',
      description: 'NoSQL database design, aggregation pipelines, and Mongoose ODM.',
      projects: 4,
      lastUsed: '2025',
      trending: true
    },
    {
      id: 8,
      name: 'ElasticSearch',
      category: 'backend',
      level: 'Intermediate',
      percentage: 55,
      experience: '1+ years',
      icon: '🔍', // ✅ fixed
      description: 'NoSQL database design, aggregation pipelines, and Kibana dashboard.',
      projects: 4,
      lastUsed: '2025',
      trending: true
    }
  ];

  const tools = [
    { name: 'VS Code', category: 'Editor', icon: Code },
    { name: 'Figma', category: 'Design', icon: Palette },
    { name: 'Chrome DevTools', category: 'Debugging', icon: Settings },
    { name: 'Vercel', category: 'Deployment', icon: Zap },
    { name: 'npm/yarn', category: 'Package Manager', icon: Package },
    { name: 'Webpack', category: 'Build Tool', icon: Terminal },
    { name: 'ESLint', category: 'Code Quality', icon: CheckCircle },
    { name: 'Prettier', category: 'Code Formatting', icon: Star },
    { name: 'Linux/Unix', category: 'Operating System', icon: Terminal }
  ];

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

  const getProgressColor = (percentage) => {
    if (percentage >= 90) return 'linear-gradient(90deg, #10b981, #059669)';
    if (percentage >= 80) return 'linear-gradient(90deg, #3b82f6, #2563eb)';
    if (percentage >= 70) return 'linear-gradient(90deg, #f59e0b, #d97706)';
    return 'linear-gradient(90deg, #ef4444, #dc2626)';
  };

  const skillStats = {
    totalSkills: skills.length,
    totalProjects: skills.reduce((sum, skill) => sum + skill.projects, 0),
    avgExperience: '2.5+ years',
    expertLevel: skills.filter(skill => skill.level === 'Expert' || skill.level === 'Advanced').length
  };

  return (
    <section id="skills" className="skills-section">
      {/* Section header */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
        className="skills-header"
      >
        <div className="section-badge">
          <Code size={16} />
          Technical Expertise
        </div>
        <h2 className="section-title">
          Skills & <span className="title-highlight">Technologies</span>
        </h2>
        <p className="section-subtitle">
          A comprehensive overview of my technical skills, tools, and technologies 
          I use to build modern web applications and solve complex problems.
        </p>
      </motion.div>

      {/* Category Filter */}
      <div className="category-filter">
        {categories.map((category) => {
          const Icon = category.icon;
          return (
            <button
              key={category.id}
              onClick={() => setActiveCategory(category.id)}
              className={`category-btn ${activeCategory === category.id ? 'active' : ''}`}
            >
              <Icon size={18} />
              {category.name}
            </button>
          );
        })}
      </div>

      {/* Skills Grid */}
      <div className="skills-grid">
        {filteredSkills.map((skill, index) => (
          <motion.div key={`skill-${skill.id}`} className="skill-card">
            <div className="skill-card-header">
              <div className="skill-icon">{skill.icon}</div>
              <div className="skill-info">
                <div className="skill-name">
                  {skill.name}
                  {skill.trending && <TrendingUp size={16} style={{ color: '#10b981', marginLeft: '0.5rem' }} />}
                </div>
                <div className="skill-meta">
                  <span className="skill-experience">{skill.experience}</span>
                  <span className="skill-level-badge" style={{ backgroundColor: getLevelColor(skill.level) }}>
                    <Star size={12} />
                    {skill.level}
                  </span>
                </div>
              </div>
              <div className="skill-percentage">{skill.percentage}%</div>
            </div>

            <div className="skill-progress">
              <div className="progress-track">
                <motion.div
                  className="progress-fill"
                  style={{ background: getProgressColor(skill.percentage) }}
                  initial={{ width: 0 }}
                  whileInView={{ width: `${skill.percentage}%` }}
                  transition={{ duration: 1.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                />
              </div>
              <div className="progress-markers">
                {[25, 50, 75].map((marker) => (
                  <div
                    key={`marker-${marker}`} // ✅ unique key fix
                    className={`progress-marker ${skill.percentage >= marker ? 'active' : ''}`}
                    style={{ left: `${marker}%` }}
                  />
                ))}
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default Skills;
