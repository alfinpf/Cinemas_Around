const router = require('express').Router();
const Movie = require("../models/movieModel");
const authMiddleware = require('../middlewares/authMiddleware');

// Adding a new Movie
router.post('/add-movie', authMiddleware, async (req, res) => {
    try {
        const newMovie = new Movie(req.body);
        await newMovie.save();
        res.send({
            success: true,
            message: " Movie added successfully"
        })
    } catch (error) {
        res.send({
            success: false,
            message: error.message
        })
    }
})

// Listing Details of all Movies


// Update details of an existing Movie
router.post('/update-movie', authMiddleware, async (req, res) => {
    try {
        await Movie.findByIdAndDelete(req.body.movieId, req.body);
        res.send({
            success: true,
            message: " Movie updated successfully"
        })
    } catch (error) {
        res.send({
            success: false,
            message: error.message
        })
    }
})

// Deleting an existing Movie
router.post('/delete-movie', authMiddleware, async (req, res) => {

    try {
        await Movie.findByIdAndDelete(req.body.movieId);
        res.send({
            success: true,
            message: "Movie deleted successfully"
        })

    } catch (error) {
        res.send({
            success: false,
            message: error.message
        })
    }
})

module.exports = router;