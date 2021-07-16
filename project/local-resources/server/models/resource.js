const mongoose = require('mongoose');

const resourceSchema = mongoose.Schema({
    id: { type: String, required: true },
    name: { type: String },
    url: { type: String },    
    children:  [{ type: mongoose.Schema.Types.ObjectId, ref: 'Document' }]
});

module.exports = mongoose.model('Resource', resourceSchema);