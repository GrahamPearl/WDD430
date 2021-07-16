
const mongoose = require('mongoose');

const noticeSchema = mongoose.Schema({
    id: { type: String, required: true },
    subject: { type: String },
    dateOf: { type: Date },
    msgText: { type: String, required: true },    
    sender: {type: mongoose.Schema.Types.String, ref: 'Contact'}    
});

module.exports = mongoose.model('Notice', noticeSchema);