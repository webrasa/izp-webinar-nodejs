const mongoose = require('mongoose');

const ArticleSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Naslov je obavezan'],
    trim: true,
    maxlength: [100, 'Naslov max 100 karaktera']
  },
  content: {
    type: String,
    required: [true, 'Sadržaj je obavezan']
  },
  author: {
    type: String,
    required: [true, 'Autor je obavezan']
  },
  tags: {
    type: [String],
    default: []
  },
  published: {
    type: Boolean,
    default: false
  },
  views: {
    type: Number,
    default: 0
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

// Text index za pretragu
ArticleSchema.index({ title: 'text', content: 'text' });

module.exports = mongoose.model('Article', ArticleSchema);