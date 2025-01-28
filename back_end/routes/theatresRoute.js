const router = require("express").Router();
const authMiddleware = require("../middlewares/authMiddleware");
const adminauthMiddleware = require("../middlewares/adminauthMiddleware");
const theatreauthMiddleware = require('../middlewares/theatreauthMiddleware')
const theatre = require("../models/theatreModel");
const Show = require("../models/showModel");


//Adding a new Theatre (internet slow, tested ok)
router.post('/addnewtheatrerequest', theatreauthMiddleware, async (req, res) => {
    try {
        const { name, address, phone, email, owner = req.body.user._id } = req.body.theatredata;
        
        if (!name || !address || !phone || !email) {
            return res.status(400).json({ message: 'All fields are required.' });
        }

        // Creating a new theater
        let newTheater = await theatre.create({ name, email, phone, owner, address });

        // response.
        res.status(201).json({ message: 'Theater created successfully', data: newTheater });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Server error. Please try again later.' });
    }
});

//Fetching details of all theatres (internet slow, tested ok)
router.get('/getalltheatres', adminauthMiddleware, async (req, res) => {
    try {
        const alltheatres = await theatre.find()
        res.json({
            success: true,
            message: "Theatre details fetched successfully",
            data: alltheatres
        })

    } catch (error) {
        res.send({
            success: false,
            message: error.message
        })
    }
})

//Fetching theatre details using TheatreID (ok)
router.post('/gettheatrebyid', adminauthMiddleware, async (req, res) => {

    try {
        const theatrebyid = await theatre.findOne({ _id: req.body.id })
        res.json({
            success: true,
            message: "Theatre details fetched successfully",
            data: theatrebyid
        })

    } catch (error) {
        res.send({
            success: false,
            message: error.message
        })
    }
})

//Deleting an existing theatre (tested, ok)
router.post('/deletetheatrebyid', adminauthMiddleware, async (req, res) => {

    try {
        await theatre.findOneAndDelete({ _id: req.body.id })
        res.json({
            success: true,
            message: "Theatre deleted successfully"
        })

    } catch (error) {
        res.send({
            success: false,
            message: error.message
        })
    }
})


module.exports = router;