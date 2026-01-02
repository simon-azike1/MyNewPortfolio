import express from 'express';
import Testimonial from '../models/Testimonial.js';
import { verifyAdmin } from './auth.js'; // Import the middleware

const router = express.Router();

// Get all testimonials (PUBLIC)
router.get('/', async (req, res) => {
  try {
    const testimonials = await Testimonial.find().sort({ createdAt: -1 });
    res.json(testimonials);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get single testimonial (PUBLIC)
router.get('/:id', async (req, res) => {
  try {
    const testimonial = await Testimonial.findById(req.params.id);
    if (!testimonial) {
      return res.status(404).json({ message: 'Testimonial not found' });
    }
    res.json(testimonial);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Create testimonial (PROTECTED)
router.post('/', verifyAdmin, async (req, res) => {
  const testimonial = new Testimonial({
    name: req.body.name,
    role: req.body.role,
    content: req.body.content,
    rating: req.body.rating,
    avatar: req.body.avatar || ''
  });

  try {
    const newTestimonial = await testimonial.save();
    res.status(201).json(newTestimonial);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Update testimonial (PROTECTED)
router.put('/:id', verifyAdmin, async (req, res) => {
  try {
    const testimonial = await Testimonial.findById(req.params.id);
    if (!testimonial) {
      return res.status(404).json({ message: 'Testimonial not found' });
    }

    Object.assign(testimonial, req.body);
    const updatedTestimonial = await testimonial.save();
    res.json(updatedTestimonial);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Delete testimonial (PROTECTED)
router.delete('/:id', verifyAdmin, async (req, res) => {
  try {
    const testimonial = await Testimonial.findById(req.params.id);
    if (!testimonial) {
      return res.status(404).json({ message: 'Testimonial not found' });
    }

    await testimonial.deleteOne();
    res.json({ message: 'Testimonial deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export default router;