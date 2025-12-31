import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Quote } from 'lucide-react';
import { testimonialsAPI } from '../../services/api';

const Testimonials = () => {
  const [testimonials, setTestimonials] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchTestimonials();
  }, []);

  const fetchTestimonials = async () => {
    try {
      setLoading(true);
      const data = await testimonialsAPI.getAll();
      setTestimonials(data);
    } catch (error) {
      console.error('Error fetching testimonials:', error);
    } finally {
      setLoading(false);
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.15, delayChildren: 0.2 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" }
    }
  };

  return (
    <section id="testimonials" className="py-24 bg-white" aria-label="Client Testimonials">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        {/* Header */}
        <motion.header
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl sm:text-5xl font-bold text-dark mb-4">
            Client <span className="text-primary">Feedback</span>
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            What clients say about working with me
          </p>
        </motion.header>

        {/* Testimonials Grid */}
        {loading ? (
          <div className="text-center py-12 text-gray-500">Loading testimonials...</div>
        ) : testimonials.length === 0 ? (
          <div className="text-center py-12 text-gray-500">No testimonials available yet.</div>
        ) : (
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {testimonials.map((testimonial) => (
              <motion.article
                key={testimonial._id}
                variants={itemVariants}
                className="bg-gray-50 rounded-xl p-8 space-y-6 hover:shadow-lg transition-shadow duration-300 border border-gray-100"
                whileHover={{ y: -5 }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
              >
                <div className="text-primary">
                  <Quote size={32} aria-hidden="true" />
                </div>

                <p className="text-gray-600 leading-relaxed italic">"{testimonial.content}"</p>

                <div className="pt-4">
                  <h4 className="font-bold text-dark">{testimonial.name}</h4>
                  <p className="text-sm text-gray-500">{testimonial.role}</p>
                </div>

                <div className="flex gap-1 text-yellow-400 text-lg" aria-label={`${testimonial.rating} out of 5 stars`}>
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <span key={i} aria-hidden="true">★</span>
                  ))}
                </div>
              </motion.article>
            ))}
          </motion.div>
        )}
      </div>
    </section>
  );
};

export default Testimonials;
