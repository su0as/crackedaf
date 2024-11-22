import mongoose from 'mongoose';

const storySchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true,
    maxlength: 300
  },
  url: {
    type: String,
    trim: true
  },
  text: {
    type: String,
    trim: true
  },
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  category: {
    type: String,
    required: true,
    enum: ['HUMANS', 'CONTENT', 'PROJECTS', 'CHALLENGES&GRANTS', 'PARTIES&EVENTS']
  },
  score: {
    type: Number,
    default: 1
  },
  upvotes: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }],
  comments: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Comment'
  }]
}, {
  timestamps: true
});

// Indexes for better query performance
storySchema.index({ score: -1 });
storySchema.index({ createdAt: -1 });
storySchema.index({ category: 1, score: -1 });

export default mongoose.model('Story', storySchema);