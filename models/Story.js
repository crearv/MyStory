const mongoose = require('mongoose');

const storySchema = mongoose.Schema({
    title: { type: String, required: true },
    heros: { type: String, required: true },
    mechant: { type: String, required: true },
    lieu: { type: String, required: true },
    mots: { type: Number, required: false },
    age: { type: Number, required: false},
    histoire: {type: String, required: false },
    userId: {type: String, required: true },
  });
  
  module.exports = mongoose.model('Story', storySchema);