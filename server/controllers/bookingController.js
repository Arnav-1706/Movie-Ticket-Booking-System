const Booking = require('../models/Booking');
const Show = require('../models/Show');

// @desc    Create new booking
// @route   POST /api/bookings
// @access  Private
const createBooking = async (req, res) => {
    try {
        const { showId, seats, userId, totalPrice } = req.body;

        // 1. Check if show exists
        const show = await Show.findById(showId);
        if (!show) {
            return res.status(404).json({ message: 'Show not found' });
        }

        // 2. Check if seats are available
        const unavailableSeats = seats.filter(seatId => {
            const showSeat = show.seats.find(s => s.id === seatId);
            return !showSeat || showSeat.status !== 'available';
        });

        if (unavailableSeats.length > 0) {
            return res.status(400).json({ message: `Seats ${unavailableSeats.join(', ')} are not available` });
        }

        // 3. Update seat status to booked
        seats.forEach(seatId => {
            const showSeat = show.seats.find(s => s.id === seatId);
            if (showSeat) {
                showSeat.status = 'booked';
            }
        });
        await show.save();

        // 4. Create booking
        const booking = await Booking.create({
            user: userId, // In a real app, use req.user.id from middleware
            show: showId,
            seats,
            totalPrice
        });

        res.status(201).json(booking);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Get user bookings
// @route   GET /api/bookings/user/:userId
// @access  Private
const getUserBookings = async (req, res) => {
    try {
        const bookings = await Booking.find({ user: req.params.userId })
            .populate({
                path: 'show',
                populate: { path: 'movie theatre' }
            });
        res.json(bookings);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = { createBooking, getUserBookings };
