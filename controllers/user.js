const User = require("../models/user");

exports.getUserById = (req, res, next, id) => {
    User.findById(id).exec((err, user) => {
        if (err || !user) {
            return res.status(400).json({
                error: "No user was found in the DB",
            });
        }
        req.profile = user;
        next();
    });
};

exports.getUserByUserName = (req, res) => {
    const username = req.query.username; //Gets username from query string
    User.find(
        {
            userName: {
                $regex: username,
                $options: "i", // Indicates case insensitive
            },
        },
        (err, doc) => {
            if (err) {
                res.status(400).json(err);
            }
            res.json(doc);
        }
    );
};

exports.getUser = (req, res) => {
    if (!req.profile) {
        return res.status(400).json({
            error: "No user was found in the DB",
        });
    }
    var { salt, encry_password, createdAt, updatedAt } = req.profile;
    salt = undefined;
    encry_password = undefined;
    createdAt = undefined;
    updatedAt = undefined;
    return res.json(req.profile);
};

exports.deleteUser = (req, res) => {
    User.findByIdAndDelete(req.params.userId, (err, deletedUser) => {
        if (err || !deletedUser) {
            return res.status(400).json({
                error: "Could not delete user",
            });
        }
        res.json(deletedUser);
    });
};

exports.updateUser = (req, res) => {
    User.findByIdAndUpdate(
        // _id comes from req. profile which is being set by the middleware when we go to /user/:userId, regardless of the type of request
        { _id: req.profile._id },
        { $set: req.body },
        { new: true, useFindAndModify: false },
        (err, user) => {
            if (err) {
                return res.status(400).json({
                    error: "DB Updating was not successful",
                });
            }
            user.salt = undefined;
            user.encry_password = undefined;
            user.createdAt = undefined;
            user.updatedAt = undefined;
            return res.json(user);
        }
    );
};

exports.followUser = async (req, res) => {
    if (!req.params.userId || !req.params.userIdTarget) {
        return res.status(400).json({
            error: "Could not find parameters",
        });
    } else {
        const userWhoIsGoingToFollowId = req.params.userId;
        const userWhoIsBeingFollowedId = req.params.userIdTarget;
        try {
            const userWhoIsGoingToFollow = await User.findById(
                userWhoIsGoingToFollowId
            );
            // userWhoIsGoingToFollowId
            userWhoIsGoingToFollow.following.push(userWhoIsBeingFollowedId);
            userWhoIsGoingToFollow.save();
            const userWhoIsBeingFollowed = await User.findById(
                userWhoIsBeingFollowedId
            );
            userWhoIsBeingFollowed.followers.push(userWhoIsGoingToFollowId);
            userWhoIsBeingFollowed.save();
            res.json({
                userWhoIsBeingFollowed,
                userWhoIsGoingToFollow,
            });
        } catch (error) {
            res.json(error);
        }
    }
};

exports.userFollowers = (req, res) => {
    const userId = req.params.userId;
    User.findById(userId)
        .populate("followers")
        .exec((err, user) => {
            if (err || !user) {
                return res.status(400).json({
                    error: "Could not find user",
                });
            }
            res.json(user.followers);
        });
};

exports.userFollowing = (req, res) => {
    const userId = req.params.userId;
    User.findById(userId)
        .populate("following")
        .exec((err, user) => {
            if (err || !user) {
                return res.status(400).json({
                    error: "Could not find user",
                });
            }
            res.json(user.following);
        });
};
