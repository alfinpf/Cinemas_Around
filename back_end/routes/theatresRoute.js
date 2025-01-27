const router = require("express").Router();
const authMiddleware = require("../middlewares/authMiddleware");
const adminauthMiddleware = require("../middlewares/adminauthMiddleware");
const theatre = require("../models/theatreModel");
const Show = require("../models/showModel");


//Adding a new Theatre
router.post('/addnewtheatrerequest',authMiddleware, async(req,res)=>{

  try {
    const {name,address,phone,email,owner= req.body.user._id} = req.body.theatre
    let newtheater = await theatre.create(name,email,phone,owner,address)
  } catch (error) {
    console.log(error);
    
  }
})





//Fetching details of all theatres
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

//Fetching theatre details using TheatreID
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




module.exports = router;