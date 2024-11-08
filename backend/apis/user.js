const express = require('express');
const Users = require("../models/userdata.js");
const router = new express.Router();
const bcrypt = require("bcryptjs");
const authenticate = require("../middleware/auth.js");
const sendMail = require("../utils/sendMail.js");
const sendToken = require("../utils/sendToken.js");
const jwt = require("jsonwebtoken");

//for user registration
router.post("/register", async (req, res) => {

    const { fname, email, password, cpassword } = req.body

    if (!fname || !email || !password || !cpassword) {
        res.status(422).json({ error: "fill all the details" });
    }

    try {
        //we are cheking if email entered by user is already in database or not.
        //registration will be done only for new users

        const preuser = await Users.findOne({ email: email });

        if (preuser) {
            res.status(422).json({ message: "This Email/phone already Exist" });
        } else if (password != cpassword) {
            res.status(422).json({ message: "Confirm password doesn't match" });
        }
        //when everything finds to be correct then save the data.
        else {
            const finalUser = {
                fname, email, password, cpassword
            };

            //To verify Email account before creating user account
            const ActivationToken = createActivationToken(finalUser);
            const activationUrl = `http://localhost:5173/activation/${ActivationToken}`

            //sending token in email;
            try {
                await sendMail({
                    email: finalUser.email,
                    subject: "Activate your NITA_Hunt account",
                    message: `Hello ${finalUser.fname}, Welcome to NITA_Hunt, Please click on the link within 5 minutes to activate your account: ${activationUrl}`
                })
                res.status(201).json({
                    success: true,
                    message: "Please check your mail to activate account"
                })
            } catch (error) {
                console.log(" error in email " + error)
                res.status(500).json(error);
            }
        }

    } catch (err) {
        console.log("error in register" + err);
        res.status(402).json(err);
    }
});

//create Activation Token function
const createActivationToken = (finalUser) => {
    return jwt.sign(finalUser, process.env.ACTIVATION_SECRETKEY, {
        // expiresIn: "5m",
    })
}

//Activate user
router.post("/activation",
    async (req, res, next) => {
        try {
            const { ActivationToken } = req.body;

            const newUser = await jwt.verify(ActivationToken, process.env.ACTIVATION_SECRETKEY)
            if (!newUser) {
                console.log("Activation token is provided wrong or expired!!");

                return next(new ErrorHandler("Invatid Token"))
            }

            const { fname, email, password, cpassword } = newUser

            const user = await Users.findOne({ email });
            if (user) {
                return res.status(500).json({ message: "user already exist" });
            }

            const StoreUser = await Users({
                fname, email, password, cpassword
            });
            await StoreUser.save()

            //sending successfull activation mail.
            try {
                await sendMail({
                    email: email,
                    subject: "Your account is created",
                    message: `Hello ${fname}, Welcome to NITA_Hunt. Now you can login to the website NITA_Hunt`
                })
                res.status(201).json({
                    success: true,
                    message: "Account created"
                })
            } catch (error) {
                res.status(500).json(error);
            }

        } catch (error) {
            console.log(error);
            res.status(500).json(error.message);
        }
    })

//for user Login
router.post("/login", async (req, res) => {

    const { email, password } = req.body
    if (!email || !password) {
        res.status(422).json({ message: "fill all the details" });
    }

    try {
        //changed
        const userValid = await Users.findOne({ email: email });

        if (userValid) {
            const isMatch = await bcrypt.compare(password, userValid.password)

            if (!isMatch) {
                res.status(422).json({ error: "incorrect details" });
            } else {
                //we will be using JWT(token) for authentication through headers
                //Token generate
                const token = await userValid.generateAuthtoken();
                //we will use this token to generate cookie and use it in frontend

                //cookie generate
                res.cookie("usercookie", token, {
                    expires: new Date(Date.now() + 9000000),
                    httpOnly: true
                });

                const result = {
                    userValid,
                    token
                }
                res.status(201).json({ status: 201, result });
            }
        }
    } catch (err) {
        console.log(err);
        res.status(401).json(err);
    }
})

//user valid
router.get("/validuser", authenticate, async (req, res) => {
    try {
        const ValidUserOne = await Users.findOne({ _id: req.userId });
        res.status(201).json({ status: 201, ValidUserOne });
    } catch (err) {
        //console.log("err");
        res.status(401).json({ status: 401, err });
    }
});

//user signout
//if user doesn't have token then we can't logout them

router.get("/logout", authenticate, async (req, res) => {
    try {

        //clear token
        req.rootUser.tokens = req.rootUser.tokens.filter((curelem) => {
            return curelem.token !== req.token
        });

        //clear cookie
        const cookies = Object.keys(req.cookies);
        cookies.forEach(cookie => {
            res.clearCookie(cookie, { path: "/" });
        });

        try {
            await req.rootUser.save();
        } catch (error) {
            console.log("error while logout");
        }

        res.status(201).json({ status: 201 });

    } catch (error) {
        res.status(401).json({ status: 401, error });
    }
});

module.exports = router;

/* 
user signup-->get activation token on mail with user data as payload---->click on activation link in mail---->
user account created---->user account successful creation mail------>user can login with the same mail-Id and password------>
 */