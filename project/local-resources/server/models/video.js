const mongoose = require('mongoose');

const videoSchema = mongoose.Schema({
    id: { type: String, required: true },
    name: { type: String },
    videoUrl: { type: String },        
});

module.exports = mongoose.model('Video', videoSchema);