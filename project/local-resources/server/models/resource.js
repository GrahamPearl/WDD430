const mongoose = require('mongoose');

const resourceSchema = mongoose.Schema({
    id: { type: String, required: true },
    title: { type: String },
    product: { type: String },    
    keywords:  [{ type: String }],
    dateOf: { type: String }    
});

module.exports = mongoose.model('Resource', resourceSchema);