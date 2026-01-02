import express from 'express';
import Skill from '../models/Skill.js';
import { verifyAdmin } from './auth.js'; // Import the middleware

const router = express.Router();

// Get all skills (PUBLIC)
router.get('/', async (req, res) => {
  try {
    const skills = await Skill.find().sort({ category: 1, percentage: -1 });
    res.json(skills);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get single skill (PUBLIC)
router.get('/:id', async (req, res) => {
  try {
    const skill = await Skill.findById(req.params.id);
    if (!skill) {
      return res.status(404).json({ message: 'Skill not found' });
    }
    res.json(skill);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Create skill (PROTECTED)
router.post('/', verifyAdmin, async (req, res) => {
  const skill = new Skill({
    name: req.body.name,
    category: req.body.category,
    level: req.body.level,
    percentage: req.body.percentage,
    experience: req.body.experience
  });

  try {
    const newSkill = await skill.save();
    res.status(201).json(newSkill);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Update skill (PROTECTED)
router.put('/:id', verifyAdmin, async (req, res) => {
  try {
    const skill = await Skill.findById(req.params.id);
    if (!skill) {
      return res.status(404).json({ message: 'Skill not found' });
    }

    Object.assign(skill, req.body);
    const updatedSkill = await skill.save();
    res.json(updatedSkill);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Delete skill (PROTECTED)
router.delete('/:id', verifyAdmin, async (req, res) => {
  try {
    const skill = await Skill.findById(req.params.id);
    if (!skill) {
      return res.status(404).json({ message: 'Skill not found' });
    }

    await skill.deleteOne();
    res.json({ message: 'Skill deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export default router;