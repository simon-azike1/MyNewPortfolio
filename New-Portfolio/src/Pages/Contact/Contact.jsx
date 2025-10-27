import React, { useRef, useState } from 'react';
import emailjs from "@emailjs/browser";
import { motion, AnimatePresence } from 'framer-motion';
import {
  Mail,
  Phone,
  MapPin,
  Github,
  Linkedin,
  Youtube,
  Facebook,
  Instagram,
  Send,
  User,
  MessageSquare,
  CheckCircle,
  AlertCircle,
  Clock,
  Calendar,
  Globe,
  Coffee,
  XCircle
} from 'lucide-react';

// EmailJS Configuration (moved to constants for better maintainability)
const EMAILJS_CONFIG = {
  serviceId: 'service_4bksq8k',
  templateId: 'template_rg09fy2',
  publicKey: 'xL6_CntdprOU1DvCJ'
};

const Contact = () => {
  const form = useRef();
  const [formStatus, setFormStatus] = useState('idle'); // idle, loading, success, error
  const [errorMessage, setErrorMessage] = useState('');
  const [formData, setFormData] = useState({
    user_name: '',
    user_email: '',
    message: ''
  });
  const [fieldErrors, setFieldErrors] = useState({});

  const contactInfo = [
    {
      icon: Mail,
      title: 'Email',
      value: 'azikeshinye@gmail.com',
      link: 'mailto:azikeshinye@gmail.com',
      description: 'Send me an email anytime',
      ariaLabel: 'Send email to azikeshinye@gmail.com'
    },
    {
      icon: Phone,
      title: 'Phone',
      value: '+212 751-780853',
      link: 'tel:+212751780853',
      description: 'Call me during business hours',
      ariaLabel: 'Call +212 751-780853'
    },
    {
      icon: MapPin,
      title: 'Location',
      value: 'Sale, Rabat, Morocco',
      link: 'https://maps.google.com/?q=Sale,Rabat,Morocco',
      description: 'Based in Morocco, available globally',
      ariaLabel: 'View Sale, Rabat, Morocco on Google Maps'
    }
  ];

  const socialLinks = [
    {
      icon: Github,
      name: 'GitHub (Main)',
      url: 'https://github.com/simon-azike1',
      color: '#333',
      username: '@simon-azike1',
      ariaLabel: 'Visit my main GitHub profile'
    },
    {
      icon: Github,
      name: 'GitHub (Alt)',
      url: 'https://github.com/samzik234?tab=repositories',
      color: '#6e5494',
      username: '@samzik234',
      ariaLabel: 'Visit my alternative GitHub profile'
    },
    {
      icon: Linkedin,
      name: 'LinkedIn',
      url: 'https://www.linkedin.com/in/simonzik/',
      color: '#0077B5',
      username: '@simonzik',
      ariaLabel: 'Visit my LinkedIn profile'
    },
    {
      icon: Youtube,
      name: 'YouTube',
      url: 'https://www.youtube.com/@SamzikTech',
      color: '#FF0000',
      username: '@SamzikTech',
      ariaLabel: 'Visit my YouTube channel'
    },
    {
      icon: Facebook,
      name: 'Facebook',
      url: 'https://web.facebook.com/simon.azike/',
      color: '#1877F2',
      username: '@simon.azike',
      ariaLabel: 'Visit my Facebook profile'
    },
    {
      icon: Instagram,
      name: 'Instagram',
      url: 'https://www.instagram.com/simonazike155/',
      color: '#E4405F',
      username: '@simon_azike',
      ariaLabel: 'Visit my Instagram profile'
    }
  ];

  const availabilityInfo = [
    {
      icon: Clock,
      title: 'Response Time',
      value: '< 24 hours',
      description: 'I typically respond within a day'
    },
    {
      icon: Calendar,
      title: 'Availability',
      value: 'Open to work',
      description: 'Available for new opportunities'
    },
    {
      icon: Globe,
      title: 'Time Zone',
      value: 'GMT+1 (Morocco)',
      description: 'Flexible with global clients'
    }
  ];

  // Validation functions
  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validateName = (name) => {
    return name.trim().length >= 2;
  };

  const validateMessage = (message) => {
    return message.trim().length >= 10;
  };

  const validateForm = () => {
    const errors = {};

    if (!validateName(formData.user_name)) {
      errors.user_name = 'Name must be at least 2 characters long';
    }

    if (!validateEmail(formData.user_email)) {
      errors.user_email = 'Please enter a valid email address';
    }

    if (!validateMessage(formData.message)) {
      errors.message = 'Message must be at least 10 characters long';
    }

    setFieldErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    
    // Clear field error when user starts typing
    if (fieldErrors[name]) {
      setFieldErrors({ ...fieldErrors, [name]: '' });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Reset previous error message
    setErrorMessage('');

    // Validate form before submission
    if (!validateForm()) {
      return;
    }

    setFormStatus('loading');

    try {
      const result = await emailjs.sendForm(
        EMAILJS_CONFIG.serviceId,
        EMAILJS_CONFIG.templateId,
        form.current,
        EMAILJS_CONFIG.publicKey
      );

      console.log('Email sent successfully:', result.text);
      
      setFormStatus('success');
      setFormData({ user_name: '', user_email: '', message: '' });
      form.current.reset();

      // Auto-hide success message after 5 seconds
      setTimeout(() => setFormStatus('idle'), 5000);
      
    } catch (error) {
      console.error('Email sending failed:', error);
      
      setFormStatus('error');
      
      // Set user-friendly error message
      if (error.text) {
        setErrorMessage(`Failed to send: ${error.text}`);
      } else if (error.status === 400) {
        setErrorMessage('Invalid form data. Please check your inputs.');
      } else if (error.status === 401) {
        setErrorMessage('Authentication failed. Please try again later.');
      } else {
        setErrorMessage('Network error. Please check your connection and try again.');
      }

      // Auto-hide error message after 7 seconds
      setTimeout(() => {
        setFormStatus('idle');
        setErrorMessage('');
      }, 7000);
    }
  };

  const handleDismissMessage = () => {
    setFormStatus('idle');
    setErrorMessage('');
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1, delayChildren: 0.2 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
  };

  return (
    <section id="contact" className="contact-section" aria-label="Contact Information">
      <div className="contact-container">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="contact-header"
        >
          <div className="section-badge">
            <MessageSquare size={16} aria-hidden="true" />
            Let's Connect
          </div>
          <h2 className="section-title">
            Get In <span className="title-highlight">Touch</span>
          </h2>
          <p className="section-subtitle">
            I'm always open to discussing new opportunities and exciting projects.
            Let's build something amazing together!
          </p>
        </motion.div>

        <div className="contact-content">
          {/* Contact Info */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="contact-info"
          >
            <div className="contact-cards">
              {contactInfo.map((info) => {
                const Icon = info.icon;
                return (
                  <motion.a
                    key={info.title}
                    variants={itemVariants}
                    href={info.link}
                    target={info.link.startsWith('http') ? '_blank' : '_self'}
                    rel={info.link.startsWith('http') ? 'noopener noreferrer' : ''}
                    className="contact-card"
                    whileHover={{ y: -5, scale: 1.02 }}
                    transition={{ type: "spring", stiffness: 300, damping: 20 }}
                    aria-label={info.ariaLabel}
                  >
                    <div className="contact-card-icon" aria-hidden="true">
                      <Icon size={24} />
                    </div>
                    <div className="contact-card-content">
                      <h3 className="contact-card-title">{info.title}</h3>
                      <p className="contact-card-value">{info.value}</p>
                      <span className="contact-card-description">{info.description}</span>
                    </div>
                  </motion.a>
                );
              })}
            </div>

            {/* Availability Info */}
            <motion.div variants={itemVariants} className="availability-section">
              <h3 className="availability-title">
                <Coffee size={20} aria-hidden="true" />
                Availability & Response
              </h3>
              <div className="availability-grid">
                {availabilityInfo.map((item) => {
                  const Icon = item.icon;
                  return (
                    <div key={item.title} className="availability-item">
                      <Icon size={16} className="availability-icon" aria-hidden="true" />
                      <div className="availability-content">
                        <span className="availability-label">{item.title}</span>
                        <span className="availability-value">{item.value}</span>
                        <span className="availability-desc">{item.description}</span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </motion.div>

            {/* Social Links - IMPROVED SECTION */}
            <motion.div 
              variants={itemVariants} 
              className="social-links-section"
            >
              <h3 className="social-links-title">
                <Globe size={20} aria-hidden="true" />
                Connect With Me
              </h3>
              <p className="social-links-subtitle">
                Follow me on social media for updates and content
              </p>
              <div className="social-links-grid" role="navigation" aria-label="Social media links">
                {socialLinks.map(({ icon: Icon, name, url, color, username, ariaLabel }) => (
                  <motion.a
                    key={`$${name}-$$ {url}`}
                    href={url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="social-link-card"
                    whileHover={{ y: -5, scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    transition={{ type: "spring", stiffness: 300, damping: 20 }}
                    aria-label={ariaLabel}
                    title={name}
                    style={{ '--icon-color': color }}
                  >
                    <div 
                      className="social-icon-wrapper"
                    >
                      <Icon size={22} />
                    </div>
                    <div className="social-info">
                      <span className="social-name">{name}</span>
                      <span className="social-username">{username}</span>
                    </div>
                  </motion.a>
                ))}
              </div>
            </motion.div>
          </motion.div>

          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
            className="contact-form-section"
          >
            <div className="form-header">
              <h3 className="form-title">
                <Send size={20} aria-hidden="true" />
                Send Me a Message
              </h3>
              <p className="form-subtitle">
                Have a project in mind? Let's discuss how we can work together.
              </p>
            </div>

            <form 
              ref={form} 
              onSubmit={handleSubmit} 
              className="contact-form" 
              noValidate
              aria-label="Contact form"
            >
              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="user_name" className="form-label">
                    <User size={16} aria-hidden="true" />
                    Full Name <span className="required" aria-label="required">*</span>
                  </label>
                  <input
                    type="text"
                    id="user_name"
                    name="user_name"
                    value={formData.user_name}
                    onChange={handleInputChange}
                    className={`form-input ${fieldErrors.user_name ? 'error' : ''}`}
                    placeholder="Enter your full name"
                    required
                    disabled={formStatus === 'loading'}
                    aria-invalid={!!fieldErrors.user_name}
                    aria-describedby={fieldErrors.user_name ? "user_name_error" : undefined}
                  />
                  {fieldErrors.user_name && (
                    <span id="user_name_error" className="field-error" role="alert">
                      {fieldErrors.user_name}
                    </span>
                  )}
                </div>

                <div className="form-group">
                  <label htmlFor="user_email" className="form-label">
                    <Mail size={16} aria-hidden="true" />
                    Email Address <span className="required" aria-label="required">*</span>
                  </label>
                  <input
                    type="email"
                    id="user_email"
                    name="user_email"
                    value={formData.user_email}
                    onChange={handleInputChange}
                    className={`form-input ${fieldErrors.user_email ? 'error' : ''}`}
                    placeholder="your.email@example.com"
                    required
                    disabled={formStatus === 'loading'}
                    aria-invalid={!!fieldErrors.user_email}
                    aria-describedby={fieldErrors.user_email ? "user_email_error" : undefined}
                  />
                  {fieldErrors.user_email && (
                    <span id="user_email_error" className="field-error" role="alert">
                      {fieldErrors.user_email}
                    </span>
                  )}
                </div>
              </div>

              <div className="form-group">
                <label htmlFor="message" className="form-label">
                  <MessageSquare size={16} aria-hidden="true" />
                  Message <span className="required" aria-label="required">*</span>
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  className={`form-textarea ${fieldErrors.message ? 'error' : ''}`}
                  placeholder="Tell me about your project, ideas, or just say hello..."
                  rows="6"
                  required
                  disabled={formStatus === 'loading'}
                  aria-invalid={!!fieldErrors.message}
                  aria-describedby={fieldErrors.message ? "message_error" : undefined}
                />
                {fieldErrors.message && (
                  <span id="message_error" className="field-error" role="alert">
                    {fieldErrors.message}
                  </span>
                )}
                <span className="character-count" aria-live="polite">
                  {formData.message.length} characters
                </span>
              </div>

              <motion.button
                type="submit"
                className={`form-submit ${formStatus}`}
                disabled={formStatus === 'loading'}
                whileHover={{ scale: formStatus === 'loading' ? 1 : 1.02 }}
                whileTap={{ scale: formStatus === 'loading' ? 1 : 0.98 }}
                aria-busy={formStatus === 'loading'}
              >
                {formStatus === 'loading' && (
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                    className="loading-spinner"
                    aria-hidden="true"
                  />
                )}
                {formStatus === 'success' && <CheckCircle size={18} aria-hidden="true" />}
                {formStatus === 'error' && <AlertCircle size={18} aria-hidden="true" />}
                {formStatus === 'idle' && <Send size={18} aria-hidden="true" />}

                <span>
                  {formStatus === 'loading' && 'Sending...'}
                  {formStatus === 'success' && 'Message Sent!'}
                  {formStatus === 'error' && 'Try Again'}
                  {formStatus === 'idle' && 'Send Message'}
                </span>
              </motion.button>
            </form>

            {/* Status Messages */}
            <AnimatePresence>
              {formStatus === 'success' && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  className="status-message success"
                  role="alert"
                  aria-live="polite"
                >
                  <CheckCircle size={20} aria-hidden="true" />
                  <div className="status-content">
                    <h4>Message sent successfully!</h4>
                    <p>Thank you for reaching out. I'll get back to you soon.</p>
                  </div>
                  <button
                    onClick={handleDismissMessage}
                    className="dismiss-button"
                    aria-label="Dismiss success message"
                  >
                    <XCircle size={18} />
                  </button>
                </motion.div>
              )}

              {formStatus === 'error' && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  className="status-message error"
                  role="alert"
                  aria-live="assertive"
                >
                  <AlertCircle size={20} aria-hidden="true" />
                  <div className="status-content">
                    <h4>Something went wrong</h4>
                    <p>
                      {errorMessage || 'Please try again or contact me directly via email.'}
                    </p>
                  </div>
                  <button
                    onClick={handleDismissMessage}
                    className="dismiss-button"
                    aria-label="Dismiss error message"
                  >
                    <XCircle size={18} />
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </div>

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="contact-cta"
        >
          <div className="cta-content">
            <h3>Ready to start your project?</h3>
            <p>Let's discuss your ideas and bring them to life together.</p>
          </div>
          <div className="cta-actions">
            <motion.a
              href="mailto:azikeshinye@gmail.com"
              className="cta-button primary"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              aria-label="Send email directly to azikeshinye@gmail.com"
            >
              <Mail size={18} aria-hidden="true" />
              Email Me Directly
            </motion.a>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Contact;
