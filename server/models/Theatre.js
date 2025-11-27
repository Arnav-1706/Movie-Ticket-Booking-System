const mongoose = require('mongoose');

const theatreSchema = mongoose.Schema({
    name: { type: String, required: true },
    location: { type: String, required: true }, // e.g., "Mumbai", "Delhi"
    address: { type: String, required: true },
    facilities: [{ type: String }]
}, { timestamps: true });

module.exports = mongoose.model('Theatre', theatreSchema);
