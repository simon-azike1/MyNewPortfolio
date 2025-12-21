import React from 'react';
import { motion } from 'framer-motion';
import { Mail, Phone, MapPin, ChevronDown, Download } from 'lucide-react';
import profileAbout from '@/assets/Images/profile-about.jpg';
import profileMain2 from '@/assets/Images/profile-main2.png';

const Hero = () => {
  const scrollToSection = (id) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut"
      }
    }
  };

  const imageVariants = {
    hidden: { opacity: 0, scale: 0.8, rotate: -10 },
    visible: {
      opacity: 1,
      scale: 1,
      rotate: 0,
      transition: {
        duration: 0.8,
        ease: "easeOut"
      }
    }
  };

  return (
    <>
      {/* Hero Section */}
      <section id="home" className="relative min-h-screen bg-white overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-white to-blue-50"></div>

        <div className="relative max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 pt-24 pb-16">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center min-h-[calc(100vh-12rem)]"
          >
            {/* Text Content */}
            <div className="space-y-8">

              <motion.h1 variants={itemVariants} className="text-5xl sm:text-6xl lg:text-7xl font-bold text-dark leading-tight">
              I'm{' '}
                <span className="relative inline-block text-primary">
                  Simon Azike
                  <div className="absolute bottom-2 left-0 w-full h-1 bg-primary-light"></div>
                </span>
              </motion.h1>

              <motion.div variants={itemVariants} className="text-2xl sm:text-3xl font-medium text-gray-600">
                <span>Software Engineer</span>
              </motion.div>

              <motion.p variants={itemVariants} className="text-lg text-gray-600 leading-relaxed max-w-2xl">
               As a Software and Network Engineer, I build secure, efficient, and high-performing digital systems. My expertise spans HTML, CSS, JavaScript, React, and Elasticsearch and other Network technologies, enabling me to create solutions that connect seamless front-end experiences with strong technical infrastructure.
              </motion.p>

              <motion.div variants={itemVariants} className="flex flex-wrap gap-4">
                <button
                  onClick={() => scrollToSection('projects')}
                  className="btn btn-primary"
                >
                  View Work
                </button>

                <button
                  onClick={() => scrollToSection('contact')}
                  className="btn btn-secondary"
                >
                  Contact
                </button>

                <a
                  href="/Azike_Simon_FrontEnd_Developer.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-outline"
                >
                  <Download size={18} />
                  Resume
                </a>
              </motion.div>

              <motion.div variants={itemVariants} className="flex items-center gap-8 pt-4">
                <div className="flex flex-col">
                  <span className="text-3xl font-bold text-primary">2+</span>
                  <span className="text-sm text-gray-500">Years Experience</span>
                </div>
                <div className="h-12 w-px bg-gray-300"></div>
                <div className="flex flex-col">
                  <span className="text-3xl font-bold text-primary">10+</span>
                  <span className="text-sm text-gray-500">Projects Completed</span>
                </div>
              </motion.div>
            </div>

            {/* Image Content */}
            <motion.div
              variants={imageVariants}
              className="flex justify-center lg:justify-end"
            >
              <div className="relative">
                <div className="relative w-80 h-80 lg:w-96 lg:h-96">
                  <img
                    src={profileMain2}
                    alt="Simon Azike - Software Engineer"
                    className="w-full h-full object-cover rounded-2xl shadow-2xl"
                  />
                  <div className="absolute inset-0 rounded-2xl bg-gradient-to-tr from-primary/10 to-transparent"></div>
                </div>
              </div>
            </motion.div>
          </motion.div>

          {/* Scroll Indicator */}
          <motion.button
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1 }}
            className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-gray-400 hover:text-primary transition-colors cursor-pointer"
            onClick={() => scrollToSection("about")}
          >
            <motion.div
              animate={{ y: [0, 8, 0] }}
              transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
            >
              <ChevronDown size={20} />
            </motion.div>
            <span className="text-sm">Scroll to explore</span>
          </motion.button>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl sm:text-5xl font-bold text-dark">
              About <span className="text-primary">Me</span>
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Profile Card */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="bg-white rounded-2xl shadow-lg p-8"
            >
              <div className="relative w-48 h-48 mx-auto mb-6">
                <img src={profileAbout} alt="Simon Azike - Professional" className="w-full h-full object-cover rounded-full" />
                <div className="absolute bottom-2 right-2 w-6 h-6 bg-white rounded-full flex items-center justify-center">
                  <div className="w-4 h-4 bg-green-500 rounded-full"></div>
                </div>
              </div>

              <div className="text-center space-y-4">
                <h3 className="text-2xl font-bold text-dark">Simon Azike</h3>
                <p className="text-lg text-gray-600">Frontend Developer</p>

                <div className="space-y-3 pt-4">
                  <div className="flex items-center gap-3 text-gray-600">
                    <Mail size={16} className="text-primary" />
                    <span>azikeshinye@gmail.com</span>
                  </div>
                  <div className="flex items-center gap-3 text-gray-600">
                    <Phone size={16} className="text-primary" />
                    <span>+212 751-780853</span>
                  </div>
                  <div className="flex items-center gap-3 text-gray-600">
                    <MapPin size={16} className="text-primary" />
                    <span>Sale Rabat, Morocco</span>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Journey Content */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              viewport={{ once: true }}
              className="bg-white rounded-2xl shadow-lg p-8"
            >
              <div className="space-y-6">
                <div>
                  <h3 className="text-2xl font-bold text-dark mb-2">My Journey</h3>
                  <div className="w-20 h-1 bg-primary"></div>
                </div>

                <div className="space-y-4 text-gray-600 leading-relaxed">
                  <p>
                    I discovered my passion for coding shortly after starting{' '}
                    <span className="text-primary font-medium">Cardiff Metropolitan University</span> on August 3rd, 2022.
                    Coming from a high school background in Electrical and Electronics, programming
                    quickly became more than a skill.
                  </p>

                  <div className="bg-blue-50 p-4 rounded-lg border-l-4 border-primary">
                    <p className="text-gray-700">
                      It's now a craft I enjoy, constantly learning and creating solutions
                      that make an impact.
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-4 pt-4">
                  <div className="text-center">
                    <span className="text-2xl font-bold text-primary block">2022</span>
                    <span className="text-sm text-gray-500">Started Journey</span>
                  </div>
                  <div className="text-center">
                    <span className="text-2xl font-bold text-primary block">20+</span>
                    <span className="text-sm text-gray-500">Skills Learned</span>
                  </div>
                  <div className="text-center">
                    <span className="text-2xl font-bold text-primary block">∞</span>
                    <span className="text-sm text-gray-500">Passion Level</span>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Hero;
