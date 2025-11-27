const mongoose = require('mongoose');

const bookingSchema = mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    show: { type: mongoose.Schema.Types.ObjectId, ref: 'Show', required: true },
    seats: [{ type: String, required: true }], // Array of seat IDs
    totalPrice: { type: Number, required: true },
    status: { type: String, enum: ['confirmed', 'cancelled'], default: 'confirmed' }
}, { timestamps: true });

module.exports = mongoose.model('Booking', bookingSchema);
