import mongoose from 'mongoose';

const skillSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  category: {
    type: String,
    required: true,
    enum: ['frontend', 'backend', 'tools']
  },
  level: {
    type: String,
    required: true,
    enum: ['Beginner', 'Intermediate', 'Advanced', 'Expert']
  },
  percentage: {
    type: Number,
    required: true,
    min: 0,
    max: 100
  },
  experience: {
    type: String,
    required: true
  }
}, {
  timestamps: true
});

export default mongoose.model('Skill', skillSchema);
