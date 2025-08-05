import React from 'react'
import { motion, AnimatePresence } from 'framer-motion'


const Skill = () => {
  
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
    return (
    <div>
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
    </div>
  )
}

export default Skill
