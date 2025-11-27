const express = require('express');
const router = express.Router();
const { createBooking, getUserBookings } = require('../controllers/bookingController');
const { protect } = require('../middleware/authMiddleware');

// For simplicity, we are not strictly enforcing 'protect' on createBooking 
// because the frontend might not send the token in this MVP flow if we don't implement full login UI.
// But we will support it.
router.post('/', createBooking);
router.get('/user/:userId', getUserBookings);

module.exports = router;
