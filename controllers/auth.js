const jwt = require("jsonwebtoken");
const expressJwt = require("express-jwt");
const User = require("../models/user");
const { validationResult } = require("express-validator");

exports.signup = (req, res) => {
    // Check result of express validator
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(422).json({
            error: errors.array()[0].msg,
            param: errors.array()[0].param,
        });
    }

    User.findOne({
        $or: [{ email: req.body.email }, { userName: req.body.userName }],
    }).exec((err, currentUser) => {
        if (err) {
            res.json({
                err: err,
            });
        } else if (currentUser) {
            res.json({
                msg: "Email or username already in use",
            });
        } else {
            new User(req.body).save((err, user) => {
                if (err) {
                    res.status(400).json({
                        err: err,
                    });
                } else {
                    const { userName, email, firstName, lastName, _id } = user;
                    res.json({
                        id: _id,
                        userName: userName,
                        email: email,
                        firstName: firstName,
                        lastName: lastName,
                    });
                }
            });
        }
    });
};

exports.signin = (req, res) => {
    const { userName, password } = req.body;

    User.findOne({ userName }).exec((err, user) => {
        if (err || !user) {
            return res.status(400).json({
                err: "User does not exists",
            });
        }

        if (!user.authenticate(password)) {
            return res.status(401).json({
                error: "Incorrect password",
            });
        }

        const token = jwt.sign({ _id: user._id }, process.env.SECRET);

        res.cookie("token", token, { expire: new Date() + 9999 });

        const { _id, firstName, userName, email, role } = user;

        res.json({ token, user: { _id, firstName, userName, email, role } });
    });
};

exports.isSignedIn = expressJwt({
    secret: process.env.SECRET,
    userProperty: "auth",
});

exports.isAuthenticated = (req, res, next) => {
    let checker = req.profile && req.auth && req.profile._id.toString() === req.auth._id;
    // console.log(req.profile._id.toString() === req.auth._id);
    if (!checker) {
        return res.status(403).json({
            error: "Access denied",
        });
    }
    next();
};

exports.isAdmin = (req, res, next) => {
    if (req.profile.role === 0) {
        res.status(403).json({
            error: "You are not ADMIN, Access Denied",
        });
    }
    next();
};
