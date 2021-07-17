const mongoose = require('mongoose');

const sequenceSchema = mongoose.Schema({    
    maxVideosId: { type: String },
    maxResourceId: { type: String },
    maxNoticesId: { type: String },
    maxContactId: { type: String },    
    maxGeotagsId: { type: String },    
});

module.exports = mongoose.model('Sequence', sequenceSchema);