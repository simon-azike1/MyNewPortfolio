import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Edit, Trash2, Save, X, Quote } from 'lucide-react';
import { testimonialsAPI, adminTestimonialsAPI } from '../../../services/api';

const TestimonialsManager = () => {
  const [testimonials, setTestimonials] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editingTestimonial, setEditingTestimonial] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    role: '',
    content: '',
    rating: 5,
  });

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
      alert('Failed to load testimonials');
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (testimonial) => {
    setEditingTestimonial(testimonial);
    setFormData({
      name: testimonial.name,
      role: testimonial.role,
      content: testimonial.content,
      rating: testimonial.rating,
    });
    setShowModal(true);
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this testimonial?')) {
      try {
        await adminTestimonialsAPI.delete(id);
        setTestimonials(testimonials.filter(t => t._id !== id));
      } catch (error) {
        console.error('Error deleting testimonial:', error);
        alert('Failed to delete testimonial');
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const testimonialData = {
      name: formData.name,
      role: formData.role,
      content: formData.content,
      rating: parseInt(formData.rating),
    };

    try {
      if (editingTestimonial) {
        const updated = await adminTestimonialsAPI.update(editingTestimonial._id, testimonialData);
        setTestimonials(testimonials.map(t => t._id === editingTestimonial._id ? updated : t));
      } else {
        const newTestimonial = await adminTestimonialsAPI.create(testimonialData);
        setTestimonials([...testimonials, newTestimonial]);
      }

      setShowModal(false);
      setEditingTestimonial(null);
      setFormData({
        name: '',
        role: '',
        content: '',
        rating: 5,
      });
    } catch (error) {
      console.error('Error saving testimonial:', error);
      alert('Failed to save testimonial');
    }
  };

  const handleAddNew = () => {
    setEditingTestimonial(null);
    setFormData({
      name: '',
      role: '',
      content: '',
      rating: 5,
    });
    setShowModal(true);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-dark">Testimonials Management</h2>
          <p className="text-gray-600">Manage client testimonials and reviews</p>
        </div>
        <button onClick={handleAddNew} className="btn btn-primary">
          <Plus size={20} />
          Add Testimonial
        </button>
      </div>

      {/* Testimonials Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {loading ? (
          <div className="col-span-2 text-center py-12 text-gray-500">Loading testimonials...</div>
        ) : testimonials.length === 0 ? (
          <div className="col-span-2 text-center py-12 text-gray-500">No testimonials yet. Add your first testimonial!</div>
        ) : (
          testimonials.map((testimonial) => (
            <motion.div
              key={testimonial._id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white rounded-xl shadow-sm p-6"
            >
              <div className="flex items-start justify-between mb-4">
                <Quote size={32} className="text-primary" />
                <div className="flex gap-2">
                  <button
                    onClick={() => handleEdit(testimonial)}
                    className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                  >
                    <Edit size={18} />
                  </button>
                  <button
                    onClick={() => handleDelete(testimonial._id)}
                    className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                  >
                    <Trash2 size={18} />
                  </button>
                </div>
              </div>

              <p className="text-gray-600 mb-4 italic">"{testimonial.content}"</p>

              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 bg-primary text-white rounded-full flex items-center justify-center font-bold">
                  {testimonial.name.charAt(0)}
                </div>
                <div>
                  <p className="font-bold text-dark">{testimonial.name}</p>
                  <p className="text-sm text-gray-500">{testimonial.role}</p>
                </div>
              </div>

              <div className="flex gap-1 text-yellow-400">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <span key={i}>★</span>
                ))}
              </div>
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
                  {editingTestimonial ? 'Edit Testimonial' : 'Add New Testimonial'}
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
                    Client Name *
                  </label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                    placeholder="John Doe"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-dark mb-2">
                    Role & Company *
                  </label>
                  <input
                    type="text"
                    value={formData.role}
                    onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                    placeholder="CEO, Company Name"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-dark mb-2">
                    Testimonial *
                  </label>
                  <textarea
                    value={formData.content}
                    onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary resize-none"
                    rows="5"
                    placeholder="Write the testimonial here..."
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-dark mb-2">
                    Rating: {formData.rating} stars
                  </label>
                  <input
                    type="range"
                    min="1"
                    max="5"
                    value={formData.rating}
                    onChange={(e) => setFormData({ ...formData, rating: e.target.value })}
                    className="w-full"
                  />
                  <div className="flex gap-1 text-yellow-400 text-xl mt-2">
                    {[...Array(parseInt(formData.rating))].map((_, i) => (
                      <span key={i}>★</span>
                    ))}
                  </div>
                </div>

                <div className="flex gap-3 pt-4">
                  <button type="submit" className="flex-1 btn btn-primary">
                    <Save size={20} />
                    {editingTestimonial ? 'Update' : 'Add Testimonial'}
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

export default TestimonialsManager;