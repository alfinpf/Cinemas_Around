const router = require('express').Router();
const movie = require("../models/movieModel");
const authMiddleware = require('../middlewares/authMiddleware');
const { upload } = require('../middlewares/fileuploadMiddleware');
const imageUploadCloudinary = require('../utils/cloudinary');
const theatreAuth = require('../middlewares/theatreauthMiddleware');

// Adding a new Movie
router.post('/addnewmovie', theatreAuth, upload.single('file'), async (req, res) => {
    try {

        console.log(req.file.path);

        try {
            const imglink = imageUploadCloudinary(req.file.path)
        } catch (error) {
            res.send(400).message("Image upload failed")
        }

        const { title, description, duration, genre, language, releaseDate, theatre } = req.body.moviedata;

        // checking all required fields are entered.
        if (!title || !description || !duration || !genre || !language || !releaseDate || !theatre) {
            return res.status(400).json({ message: 'All fields are required.' });
        }
        //model.
        let newMovie = await movie.create({
            title,
            description,
            duration,
            genre,
            language,
            releaseDate,
            theatre,
            imglink
        });

        // Response.
        res.status(201).json({ message: 'Movie added successfully', data: newMovie });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Server error. Please try again later.' });
    }
});


//Fetching details of all movies
router.get('/getallmovies', async (req, res) => {
    try {
        const allmovies = await movie.find()
        res.json({
            success: true,
            message: "Movies details fetched successfully",
            data: allmovies
        })

    } catch (error) {
        res.send({
            success: false,
            message: error.message
        })
    }
})

//Fetching movie details using MovieID
router.post('/getmoviebyid', async (req, res) => {

    try {
        const moviebyid = await movie.findOne({ _id: req.body.id })
        res.json({
            success: true,
            message: "Movie details fetched successfully",
            data: moviebyid
        })

    } catch (error) {
        res.send({
            success: false,
            message: error.message
        })
    }
})


// Deleting an existing Movie

router.post('/deletemoviebyid', theatreAuth, async (req, res) => {

    try {
        await movie.findOneAndDelete({ _id: req.body.id })
        res.json({
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