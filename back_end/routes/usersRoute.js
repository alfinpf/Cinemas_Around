const router = require('express').Router();
const user = require('../models/userModel');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const adminauthMiddleware = require('../middlewares/adminauthMiddleware.js')

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
        const salt = 10;
        const hashedPassword = await bcrypt.hash(req.body.password, salt);
        req.body.password = hashedPassword;

        // Registering new User
        const newUser = new user(req.body);
        await newUser.save();
        const token = jwt.sign({ userId: newUser._id, role: newUser.role, Email: newUser.email }, process.env.jwt_secret, { expiresIn: "1d" })
        res.cookie("token", token, {
            sameSite: "None",
            secure: true,
            httpOnly: true,
        });

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
        const rgstduser = await user.findOne({ email: req.body.email });
        if (!rgstduser) {
            return res.status(400).send({
                success: false,
                message: "User doesn't exist"
            });
        }


        //Validating the password by comparing hashed password & plain password.
        const validPassword = await bcrypt.compare(req.body.password, rgstduser.password)

        //Invalid password.
        if (validPassword == false) {
            return res.status(400).send({
                success: false,
                message: "Password Entered is invalid."
            })
        }

        //Creating Token
        const token = jwt.sign({ userId: rgstduser._id, role: rgstduser.role, Email: rgstduser.email }, process.env.jwt_secret, { expiresIn: "1d" })

        res.cookie("token", token, {
            sameSite: "None",
            secure: true,
            httpOnly: true,
        });

        //When the password entered is valid.
        res.send({ success: true, message: "Logged in successfully", data: token })

    } catch (error) {
        res.status(400).send({
            success: false,
            message: error.message
        });
    }
});

//Fetching details of all users (password avoided-)
router.get('/getallusers', adminauthMiddleware, async (req, res) => {

    try {
        const allusers = await user.find().select('-password')
        res.json({
            success: true,
            message: "Users details fetched successfully",
            data: allusers
        })

    } catch (error) {
        res.send({
            success: false,
            message: error.message
        })
    }
})

//Fetching user details using UserID (password avoided-)
router.post('/getuserbyid', adminauthMiddleware, async (req, res) => {

    try {
        const userbyid = await user.findOne({_id: req.body.id }).select('-password')
        res.json({
            success: true,
            message: "User details fetched successfully",
            data: userbyid
        })

    } catch (error) {
        res.send({
            success: false,
            message: error.message
        })
    }
})

// Logout
router.get('/logout', async (req, res) => {
    try {
        res.clearCookie("token", {
            sameSite: "None",
            secure: true,
            httpOnly: true,
        });

        res.json({ msg: "Logout Successful", ts: "success" });
    } catch (error) {
        res.status(error.status || 500).json({ msg: error.message || "Internal server error", ts: "error" });
    }
})

module.exports = router;

