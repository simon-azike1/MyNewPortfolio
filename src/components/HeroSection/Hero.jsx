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
      <section id="home" className="relative min-h-screen bg-theme-bg-primary overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-theme-bg-secondary via-theme-bg-primary to-theme-bg-secondary"></div>
        <div className="absolute -top-24 -right-24 h-64 w-64 rounded-full bg-theme-accent-primary/10 blur-3xl"></div>
        <div className="absolute -bottom-24 -left-24 h-64 w-64 rounded-full bg-theme-accent-secondary/20 blur-3xl"></div>

        <div className="relative max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 pt-24 sm:pt-28 pb-16 sm:pb-20">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="grid grid-cols-1 lg:grid-cols-[1.1fr_0.9fr] gap-12 items-center min-h-[calc(100vh-10rem)]"
          >
            {/* Text Content */}
            <div className="space-y-8">
              <motion.div variants={itemVariants} className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-theme-bg-tertiary text-theme-text-secondary text-sm font-medium border border-theme">
                <span className="h-2 w-2 rounded-full bg-theme-accent-primary"></span>
                Available for collaborations
              </motion.div>

              <motion.h1 variants={itemVariants} className="text-5xl sm:text-6xl lg:text-7xl font-bold text-theme-text-primary leading-tight">
                I'm{' '}
                <span className="text-theme-accent-primary">
                  Simon Azike
                </span>
              </motion.h1>

              <motion.div variants={itemVariants} className="text-2xl sm:text-3xl font-medium text-theme-text-secondary">
                <span>Software & Network Engineer</span>
              </motion.div>

              <motion.p variants={itemVariants} className="text-lg text-theme-text-secondary leading-relaxed max-w-2xl">
                I build secure, efficient, high-performing digital systems. My work blends polished front-end experiences
                with dependable infrastructure across React, JavaScript, and network technologies.
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
                  href="/Azike_Simon_Software_Engineer.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-outline"
                >
                  <Download size={18} />
                  Resume
                </a>
              </motion.div>

              <motion.div variants={itemVariants} className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4">
                <div className="bg-theme-card border border-theme rounded-xl p-4">
                  <span className="text-2xl font-bold text-theme-accent-primary block">2+</span>
                  <span className="text-sm text-theme-text-tertiary">Years Experience</span>
                </div>
                <div className="bg-theme-card border border-theme rounded-xl p-4">
                  <span className="text-2xl font-bold text-theme-accent-primary block">10+</span>
                  <span className="text-sm text-theme-text-tertiary">Projects Completed</span>
                </div>
                <div className="bg-theme-card border border-theme rounded-xl p-4">
                  <span className="text-2xl font-bold text-theme-accent-primary block">5+</span>
                  <span className="text-sm text-theme-text-tertiary">Tech Domains</span>
                </div>
              </motion.div>
            </div>

            {/* Image Content */}
            <motion.div
              variants={imageVariants}
              className="relative flex justify-center lg:justify-end"
            >
              <div className="relative w-72 h-72 sm:w-80 sm:h-80 lg:w-[26rem] lg:h-[26rem]">
                <img
                  src={profileMain2}
                  alt="Simon Azike - Software Engineer"
                  className="w-full h-full object-cover rounded-3xl shadow-2xl"
                />
                <div className="absolute inset-0 rounded-3xl bg-gradient-to-tr from-theme-accent-primary to-transparent opacity-20"></div>

                <div className="absolute left-2 sm:-left-6 top-6 sm:top-8 bg-theme-card border border-theme rounded-2xl px-4 py-3 shadow-lg">
                  <p className="text-sm text-theme-text-tertiary">Based in</p>
                  <p className="font-semibold text-theme-text-primary">Rabat, Morocco</p>
                </div>

                <div className="absolute right-2 sm:-right-6 bottom-6 sm:bottom-8 bg-theme-card border border-theme rounded-2xl px-4 py-3 shadow-lg">
                  <p className="text-sm text-theme-text-tertiary">Focused on</p>
                  <p className="font-semibold text-theme-text-primary">Full-Stack Delivery</p>
                </div>
              </div>
            </motion.div>
          </motion.div>

          {/* Scroll Indicator */}
          <div className="mt-10 flex justify-center">
            <motion.button
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1 }}
              className="flex flex-col items-center gap-2 rounded-full bg-theme-bg-secondary/80 px-4 py-2 text-theme-text-primary shadow-md backdrop-blur-sm hover:text-theme-accent-primary transition-colors cursor-pointer"
              onClick={() => scrollToSection("about")}
            >
              <motion.div
                animate={{ y: [0, 6, 0] }}
                transition={{ repeat: Infinity, duration: 1.6, ease: "easeInOut" }}
              >
                <ChevronDown size={20} />
              </motion.div>
              <span className="text-sm">Scroll to explore</span>
            </motion.button>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-24 bg-theme-bg-secondary">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl sm:text-5xl font-bold text-theme-text-primary">
              About <span className="text-theme-accent-primary">Me</span>
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Profile Card */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="bg-theme-card rounded-2xl shadow-lg p-8 border border-theme"
            >
              <div className="relative w-48 h-48 mx-auto mb-6">
                <img src={profileAbout} alt="Simon Azike - Professional" className="w-full h-full object-cover rounded-full" />
                <div className="absolute bottom-2 right-2 w-6 h-6 bg-theme-card rounded-full flex items-center justify-center">
                  <div className="w-4 h-4 bg-theme-accent-primary rounded-full"></div>
                </div>
              </div>

              <div className="text-center space-y-4">
                <h3 className="text-2xl font-bold text-theme-text-primary">Simon Azike</h3>
                <p className="text-lg text-theme-text-secondary">Software Engineer</p>

                <div className="space-y-3 pt-4">
                  <div className="flex items-center gap-3 text-theme-text-secondary">
                    <Mail size={16} className="text-theme-accent-primary" />
                    <span>azikeshinye@gmail.com</span>
                  </div>
                  <a
                    href="https://wa.me/212751780853?text=Hello%20Simon%2C%20I%20saw%20your%20portfolio%20and%20would%20like%20to%20discuss%20a%20project.%20Are%20you%20available%20for%20a%20quick%20chat%3F"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 text-theme-text-secondary hover:text-theme-accent-primary transition-colors"
                  >
                    <Phone size={16} className="text-theme-accent-primary" />
                    <span>+212 751-780853</span>
                  </a>
                  <div className="flex items-center gap-3 text-theme-text-secondary">
                    <MapPin size={16} className="text-theme-accent-primary" />
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
              className="bg-theme-card rounded-2xl shadow-lg p-8 border border-theme"
            >
              <div className="space-y-6">
                <div>
                  <h3 className="text-2xl font-bold text-theme-text-primary mb-2">My Journey</h3>
                  <div className="w-20 h-1 bg-theme-accent-primary"></div>
                </div>

                <div className="space-y-4 text-theme-text-secondary leading-relaxed">
                  <p>
                    I discovered my passion for coding shortly after starting at Cardiff Metropolitan University on August 3rd, 2022.
                    Coming from a high school background in Electrical and Electronics, programming
                    quickly became more than a skill.
                  </p>

                  <details className="about-disclosure rounded-xl border border-theme bg-theme-bg-secondary p-4">
                    <summary className="cursor-pointer text-theme-accent-primary font-medium">
                      About Cardiff Metropolitan University
                    </summary>
                    <div className="about-disclosure__content mt-3 text-sm text-theme-text-secondary space-y-2">
                      <p>
                        Cardiff Metropolitan University is a public university in Cardiff, Wales,
                        known for strong programs in design, technology, and applied research.
                      </p>
                      <a
                        href="https://www.cardiffmet.ac.uk/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 text-theme-accent-primary hover:text-theme-accent-hover transition-colors"
                      >
                        Visit university website
                      </a>
                    </div>
                  </details>

                  <div className="bg-theme-bg-tertiary p-4 rounded-lg border-l-4 border-theme-accent-primary">
                    <p className="text-theme-text-secondary">
                      It's now a craft I enjoy, constantly learning and creating solutions
                      that make an impact.
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4">
                  <div className="text-center">
                    <span className="text-2xl font-bold text-theme-accent-primary block">2022</span>
                    <span className="text-sm text-theme-text-tertiary">Started Journey</span>
                  </div>
                  <div className="text-center">
                    <span className="text-2xl font-bold text-theme-accent-primary block">20+</span>
                    <span className="text-sm text-theme-text-tertiary">Skills Learned</span>
                  </div>
                  <div className="text-center">
                    <span className="text-2xl font-bold text-theme-accent-primary block">∞</span>
                    <span className="text-sm text-theme-text-tertiary">Passion Level</span>
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
