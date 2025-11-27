const Show = require('../models/Show');

// @desc    Get shows for a movie
// @route   GET /api/shows/movie/:movieId
// @access  Public
const getShowsByMovie = async (req, res) => {
    try {
        const { movieId } = req.params;
        const { region, date } = req.query;

        // Build query
        let query = { movie: movieId };

        // If region is provided, we need to filter by theatres in that region.
        // This requires a lookup or populating theatre and filtering.
        // For simplicity, we'll fetch shows and populate theatre, then filter in memory or use aggregate.

        let shows = await Show.find(query).populate('theatre');

        if (region) {
            shows = shows.filter(show => show.theatre.location === region);
        }

        if (date) {
            const queryDate = new Date(date);
            shows = shows.filter(show => {
                const showDate = new Date(show.startTime);
                return showDate.toDateString() === queryDate.toDateString();
            });
        }

        res.json(shows);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Get show by ID
// @route   GET /api/shows/:id
// @access  Public
const getShowById = async (req, res) => {
    try {
        const show = await Show.findById(req.params.id).populate('movie').populate('theatre');
        if (show) {
            res.json(show);
        } else {
            res.status(404).json({ message: 'Show not found' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = { getShowsByMovie, getShowById };
