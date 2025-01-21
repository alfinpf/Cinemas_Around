const router = require('express').Router();
const user = require('../models/userModel');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const authMiddleware = require('../middlewares/authMiddleware');

//Registering a new User.
router.post("/register", async (req, res) => {
    try {

        // Existing User- Check
        const userExists = await user.findOne({ email: req.body.email });
        if (userExists) {
            return res.status(400).send({
                success: false,
                message: "User already exists"
            })
        }

        // Password- Hash
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(req.body.password, salt);
        req.body.password = hashedPassword;

        // Registering new User
        const newUser = new user(req.body);
        await newUser.save();
        res.status(201).send({ success: true, message: "User Created Successfully" });

    } catch (error) {
        res.status(400).send({
            success: false,
            message: error.message
        });
    }
});

//Logging in by an existing user.
router.post("/login", async (req, res) => {
    try {
        // Checking whether the user exists.
        const user = await User.findOne({ email: req.body.email });
        if (!user) {
            return res.status(400).send({
                success: false,
                message: "User doesn't exist"
            });
        }

        //Validating the password by comparing hashed password & plain password.
        const validPassword = await bcrypt.compare(
            req.body.password, user.password
        )

        //Invalid password.
        if (!validPassword) {
            return res.status(400).send({
                success: false,
                message: "Password Entered is invalid."
            })
        }

        //Creating Token
        const token = jwt.sign({ userId: user._id }, process.env.jwt_secret, { expiresIn: "1d" })



        //When the password entered is valid.
        res.send({ success: true, message: "Logged in successfully", data: token })

    } catch (error) {
        res.status(400).send({
            success: false,
            message: error.message
        });
    }
});

//Fetching user details using UserID (password avoided-)
router.get('get-current-user' , authMiddleware, async(req, res)=>{
    try {
        const user = await user.findById(req.body.userId).select('-password')
        res.send({
            success: true,
            message: "User details fetched successfully",
            data: user
        })


    } catch (error) {
        res.send({
            success:false,
            message: error.message
        })
    }
})

module.exports = router; 

