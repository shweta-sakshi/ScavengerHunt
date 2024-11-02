const jwt = require("jsonwebtoken");
const usrdb = require("../models/userdata");
const keySecret = process.env.SECRETKEY;

const authenticate = async (req, res, next) => {
    try {
        const token = req.headers.authorization;
        const verifytoken = jwt.verify(token, keySecret);

        const rootUser = await usrdb.findOne({ _id: verifytoken._id });

        if (!rootUser) {
            throw new Error("user not found")
        }

        req.token = token;
        req.rootUser = rootUser;
        req.userId = rootUser._id;

        next();

    } catch (err) {
        res.status(401).json({ status: 401, message: "Unauthorized no token provided" });
    }
}

module.exports = authenticate;