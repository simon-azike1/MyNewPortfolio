import React, { useRef } from 'react';
import emailjs from "@emailjs/browser";
import { motion } from 'framer-motion';

import {
  Mail,
  Phone,
  MapPin,
  Github,
  Linkedin,
  Youtube,
  Facebook,
  Instagram
} from 'lucide-react';
const Contact = () => {
  const form = useRef();

  const handleSubmit = (e) => {
    e.preventDefault();
    emailjs.sendForm(
      "service_4bksq8k",      
      "template_rg09fy2",     
      form.current,
      "xL6_CntdprOU1DvCJ" 
    ).then(
      (result) => {
        console.log("SUCCESS!", result.text);
        form.current.reset();
        alert("Message sent successfully!");
      },
      (error) => {
        console.log("FAILED...", error.text);
        alert("Something went wrong. Please try again.");
      }
    );
  };

  return (
    <div>
      <section id="contact" className="section">
        <div className="contact-center">
          <div className="container">

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="section-header"
            >
              <h2 className="section-title">Get In Touch</h2>
              <p className="section-description">
                I'm always open to discussing new opportunities and exciting projects. Let's connect!
              </p>
            </motion.div>

            <div className="contact-grid">
              {/* Contact Info */}
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true }}
                className="contact-info-section"
              >
                <div className="contact-info-item">
                  <Mail size={24} />
                  <div>
                    <h3>Email</h3>
                    <p>azikeshinye@gmail.com</p>
                  </div>
                </div>

                <div className="contact-info-item">
                  <Phone size={24} />
                  <div>
                    <h3>Phone</h3>
                    <p>+212 751-780853</p>
                  </div>
                </div>

                <div className="contact-info-item">
                  <MapPin size={24} />
                  <div>
                    <h3>Location</h3>
                    <p>Bab Cheffa Sale, Rabat, Morocco</p>
                  </div>
                </div>

                <div className="social-links">
                  <a href="https://github.com/samzik234?tab=repositories" target="_blank" rel="noreferrer">
                    <Github size={24} />
                  </a>
                  <a href="https://github.com/simon-azike1" target="_blank" rel="noreferrer">
                    <Github size={24} />
                  </a>
                  <a href="https://www.linkedin.com/in/simonzik/" target="_blank" rel="noreferrer">
                    <Linkedin size={24} />
                  </a>
                  <a href="https://www.youtube.com/@SamzikTech" target="_blank" rel="noreferrer">
                    <Youtube size={24} />
                  </a>
                  <a href="https://web.facebook.com/simon.azike/" target="_blank" rel="noreferrer">
                    <Facebook size={24} />
                  </a>
                  <a href="https://www.instagram.com/your_instagram_username" target="_blank" rel="noreferrer">
                    <Instagram size={24} />
                  </a>
                </div>
              </motion.div>

              {/* Contact Form */}
              <motion.div
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true }}
                className="contact-form"
              >
                <h3 className="form-title">Send me a message</h3>
                <form
                  ref={form}
                  onSubmit={handleSubmit}
                  style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}
                >
                  <div className="form-group">
                    <label className="form-label">Name</label>
                    <input
                      type="text"
                      name="user_name"
                      className="form-input"
                      placeholder="Your name"
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label className="form-label">Email</label>
                    <input
                      type="email"
                      name="user_email"
                      className="form-input"
                      placeholder="your.email@example.com"
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label className="form-label">Message</label>
                    <textarea
                      name="message"
                      className="form-textarea"
                      placeholder="Your message..."
                      required
                    />
                  </div>
                  <button type="submit" className="form-submit">
                    Send Message
                  </button>
                </form>
              </motion.div>
            </div>

          </div>
        </div>
      </section>
    </div>
  );
};

export default Contact;
