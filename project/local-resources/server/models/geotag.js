const mongoose = require('mongoose');

const geotagSchema = mongoose.Schema({
    id: { type: String, required: true },
    name: { type: String },        
});

module.exports = mongoose.model('Geotag', geotagSchema);