const Movie = require('../models/Movie');

// @desc    Get all movies
// @route   GET /api/movies
// @access  Public
const getMovies = async (req, res) => {
    try {
        const { region } = req.query;
        // In a real app, we would filter by region availability.
        // For now, we return all movies or filter if we had a region mapping.
        // We can implement region filtering by checking if the movie has shows in theatres of that region.
        // For this MVP, we will return all movies.

        const movies = await Movie.find({});
        res.json(movies);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Get movie by ID
// @route   GET /api/movies/:id
// @access  Public
const getMovieById = async (req, res) => {
    try {
        const movie = await Movie.findById(req.params.id);
        if (movie) {
            res.json(movie);
        } else {
            res.status(404).json({ message: 'Movie not found' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = { getMovies, getMovieById };
