const RetweetedPost = require("../models/retweetedPost");

exports.retweetPost = (req, res) => {
    // Get userId and postId from params
    const userId = req.params.userId;
    const postId = req.params.postId;

    // Check if retweeted with comment
    const withComment = req.body.withComment;

    // Get comment if retweeted with comment
    let comment = "";
    if (withComment) {
        comment = req.body.comment;
    }

    const obj = {
        userId,
        postId,
        withComment,
        comment,
    };

    new RetweetedPost(obj).save((err, rtPost) => {
        if (err) {
            res.status(400).json(err);
        }
        res.json(rtPost);
    });
};

exports.retweetedPostsByAUser = (req, res) => {
    const userId = req.params.userId;
    RetweetedPost.find({ userId: userId }, (err, docs) => {
        if (err) {
            res.status(400).json(err);
        }
        res.json(docs);
    });
};

exports.retweetsOfAPost = (req, res) => {
    const postId = req.params.postId;
    RetweetedPost.find({ postId: postId }, (err, docs) => {
        if (err) {
            res.status(400).json(err);
        }
        res.json(docs);
    });
};
