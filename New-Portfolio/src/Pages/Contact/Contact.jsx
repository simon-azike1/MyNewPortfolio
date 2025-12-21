import React, { useRef, useState } from 'react';
import emailjs from "@emailjs/browser";
import { motion, AnimatePresence } from 'framer-motion';
import {
  Mail,
  Phone,
  MapPin,
  Github,
  Linkedin,
  Send,
  CheckCircle,
  AlertCircle,
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
      name: 'GitHub',
      url: 'https://github.com/simon-azike1',
      ariaLabel: 'Visit my GitHub profile'
    },
    {
      icon: Linkedin,
      name: 'LinkedIn',
      url: 'https://www.linkedin.com/in/simonzik/',
      ariaLabel: 'Visit my LinkedIn profile'
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
    <section id="contact" className="py-24 bg-gray-50" aria-label="Contact Information">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl sm:text-5xl font-bold text-dark mb-4">
            Get In <span className="text-primary">Touch</span>
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Open to discussing new opportunities and project collaborations.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Info */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="space-y-8"
          >
            <div className="space-y-4">
              {contactInfo.map((info) => {
                const Icon = info.icon;
                return (
                  <motion.a
                    key={info.title}
                    variants={itemVariants}
                    href={info.link}
                    target={info.link.startsWith('http') ? '_blank' : '_self'}
                    rel={info.link.startsWith('http') ? 'noopener noreferrer' : ''}
                    className="flex items-start gap-4 p-6 bg-white rounded-xl hover:shadow-lg transition-shadow duration-300 border border-gray-100 group"
                    whileHover={{ y: -5, scale: 1.02 }}
                    transition={{ type: "spring", stiffness: 300, damping: 20 }}
                    aria-label={info.ariaLabel}
                  >
                    <div className="w-12 h-12 bg-blue-50 rounded-lg flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-colors flex-shrink-0" aria-hidden="true">
                      <Icon size={24} />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-bold text-dark text-lg mb-1">{info.title}</h3>
                      <p className="text-primary font-medium mb-1">{info.value}</p>
                      <span className="text-sm text-gray-500">{info.description}</span>
                    </div>
                  </motion.a>
                );
              })}
            </div>

            {/* Social Links */}
            <motion.div
              variants={itemVariants}
              className="bg-white rounded-xl p-6 border border-gray-100"
            >
              <h3 className="text-xl font-bold text-dark mb-4">Connect</h3>
              <div className="flex gap-4" role="navigation" aria-label="Social media links">
                {socialLinks.map(({ icon: Icon, name, url, ariaLabel }) => (
                  <motion.a
                    key={name}
                    href={url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 px-6 py-3 bg-gray-50 hover:bg-primary hover:text-white text-gray-700 rounded-lg transition-colors font-medium"
                    whileHover={{ y: -3 }}
                    transition={{ type: "spring", stiffness: 300, damping: 20 }}
                    aria-label={ariaLabel}
                  >
                    <Icon size={20} />
                    <span>{name}</span>
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
            className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100"
          >
            <div className="mb-8">
              <h3 className="text-2xl font-bold text-dark mb-2">Send a Message</h3>
              <p className="text-gray-600">
                Have a project in mind? Let's discuss how we can work together.
              </p>
            </div>

            <form
              ref={form}
              onSubmit={handleSubmit}
              className="space-y-6"
              noValidate
              aria-label="Contact form"
            >
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="user_name" className="block text-sm font-medium text-dark mb-2">
                    Full Name <span className="text-red-500" aria-label="required">*</span>
                  </label>
                  <input
                    type="text"
                    id="user_name"
                    name="user_name"
                    value={formData.user_name}
                    onChange={handleInputChange}
                    className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 transition-colors ${
                      fieldErrors.user_name
                        ? 'border-red-300 focus:ring-red-200'
                        : 'border-gray-300 focus:ring-primary focus:border-primary'
                    }`}
                    placeholder="Enter your full name"
                    required
                    disabled={formStatus === 'loading'}
                    aria-invalid={!!fieldErrors.user_name}
                    aria-describedby={fieldErrors.user_name ? "user_name_error" : undefined}
                  />
                  {fieldErrors.user_name && (
                    <span id="user_name_error" className="text-sm text-red-600 mt-1 block" role="alert">
                      {fieldErrors.user_name}
                    </span>
                  )}
                </div>

                <div>
                  <label htmlFor="user_email" className="block text-sm font-medium text-dark mb-2">
                    Email Address <span className="text-red-500" aria-label="required">*</span>
                  </label>
                  <input
                    type="email"
                    id="user_email"
                    name="user_email"
                    value={formData.user_email}
                    onChange={handleInputChange}
                    className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 transition-colors ${
                      fieldErrors.user_email
                        ? 'border-red-300 focus:ring-red-200'
                        : 'border-gray-300 focus:ring-primary focus:border-primary'
                    }`}
                    placeholder="your.email@example.com"
                    required
                    disabled={formStatus === 'loading'}
                    aria-invalid={!!fieldErrors.user_email}
                    aria-describedby={fieldErrors.user_email ? "user_email_error" : undefined}
                  />
                  {fieldErrors.user_email && (
                    <span id="user_email_error" className="text-sm text-red-600 mt-1 block" role="alert">
                      {fieldErrors.user_email}
                    </span>
                  )}
                </div>
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-medium text-dark mb-2">
                  Message <span className="text-red-500" aria-label="required">*</span>
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 transition-colors resize-none ${
                    fieldErrors.message
                      ? 'border-red-300 focus:ring-red-200'
                      : 'border-gray-300 focus:ring-primary focus:border-primary'
                  }`}
                  placeholder="Tell me about your project, ideas, or just say hello..."
                  rows="6"
                  required
                  disabled={formStatus === 'loading'}
                  aria-invalid={!!fieldErrors.message}
                  aria-describedby={fieldErrors.message ? "message_error" : undefined}
                />
                {fieldErrors.message && (
                  <span id="message_error" className="text-sm text-red-600 mt-1 block" role="alert">
                    {fieldErrors.message}
                  </span>
                )}
                <span className="text-sm text-gray-500 mt-1 block" aria-live="polite">
                  {formData.message.length} characters
                </span>
              </div>

              <motion.button
                type="submit"
                className={`w-full btn ${
                  formStatus === 'success' ? 'bg-green-500 hover:bg-green-600 text-white' :
                  formStatus === 'error' ? 'bg-red-500 hover:bg-red-600 text-white' :
                  'btn-primary'
                } disabled:opacity-50 disabled:cursor-not-allowed`}
                disabled={formStatus === 'loading'}
                whileHover={{ scale: formStatus === 'loading' ? 1 : 1.02 }}
                whileTap={{ scale: formStatus === 'loading' ? 1 : 0.98 }}
                aria-busy={formStatus === 'loading'}
              >
                {formStatus === 'loading' && (
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                    className="w-5 h-5 border-2 border-white border-t-transparent rounded-full"
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
                  className="mt-6 p-4 bg-green-50 border border-green-200 rounded-lg flex items-start gap-3"
                  role="alert"
                  aria-live="polite"
                >
                  <CheckCircle size={20} className="text-green-600 flex-shrink-0 mt-0.5" aria-hidden="true" />
                  <div className="flex-1">
                    <h4 className="font-bold text-green-900">Message sent successfully!</h4>
                    <p className="text-sm text-green-700">Thank you for reaching out. I'll get back to you soon.</p>
                  </div>
                  <button
                    onClick={handleDismissMessage}
                    className="text-green-600 hover:text-green-800 transition-colors"
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
                  className="mt-6 p-4 bg-red-50 border border-red-200 rounded-lg flex items-start gap-3"
                  role="alert"
                  aria-live="assertive"
                >
                  <AlertCircle size={20} className="text-red-600 flex-shrink-0 mt-0.5" aria-hidden="true" />
                  <div className="flex-1">
                    <h4 className="font-bold text-red-900">Something went wrong</h4>
                    <p className="text-sm text-red-700">
                      {errorMessage || 'Please try again or contact me directly via email.'}
                    </p>
                  </div>
                  <button
                    onClick={handleDismissMessage}
                    className="text-red-600 hover:text-red-800 transition-colors"
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
          className="mt-16 bg-gradient-to-r from-primary to-primary-light rounded-2xl p-12 text-center text-white"
        >
          <h3 className="text-3xl font-bold mb-4">Ready to start your project?</h3>
          <p className="text-lg mb-8 text-blue-100">Let's discuss your ideas and bring them to life together.</p>
          <motion.a
            href="mailto:azikeshinye@gmail.com"
            className="inline-flex items-center gap-2 px-8 py-4 bg-white text-primary rounded-lg font-medium hover:bg-gray-100 transition-colors shadow-lg"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            aria-label="Send email directly to azikeshinye@gmail.com"
          >
            <Mail size={18} aria-hidden="true" />
            Email Me Directly
          </motion.a>
        </motion.div>
      </div>
    </section>
  );
};

export default Contact;
