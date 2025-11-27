const mongoose = require('mongoose');

const showSchema = mongoose.Schema({
    movie: { type: mongoose.Schema.Types.ObjectId, ref: 'Movie', required: true },
    theatre: { type: mongoose.Schema.Types.ObjectId, ref: 'Theatre', required: true },
    startTime: { type: Date, required: true },
    price: { type: Number, required: true },
    seats: [
        {
            id: { type: String, required: true }, // e.g., "A1", "B2"
            status: { type: String, enum: ['available', 'booked', 'locked'], default: 'available' },
            type: { type: String, enum: ['standard', 'premium'], default: 'standard' }
        }
    ]
}, { timestamps: true });

module.exports = mongoose.model('Show', showSchema);
