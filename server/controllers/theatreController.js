const Theatre = require('../models/Theatre');

// @desc    Get theatres by region
// @route   GET /api/theatres?region=Mumbai
// @access  Public
const getTheatres = async (req, res) => {
    try {
        const { region } = req.query;
        let query = {};
        if (region) {
            query.location = region;
        }
        const theatres = await Theatre.find(query);
        res.json(theatres);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Get theatre by ID
// @route   GET /api/theatres/:id
// @access  Public
const getTheatreById = async (req, res) => {
    try {
        const theatre = await Theatre.findById(req.params.id);
        if (theatre) {
            res.json(theatre);
        } else {
            res.status(404).json({ message: 'Theatre not found' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = { getTheatres, getTheatreById };
