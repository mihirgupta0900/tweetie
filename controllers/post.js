const Post = require("../models/post");

exports.getPostById = (req, res, next, id) => {
    Post.findById(id).exec((err, post) => {
        if (err) {
            return res.status(400).json({
                err: err,
                msg: "Could not find post",
            });
        }
        req.post = post;
        next();
    });
};

exports.createPost = (req, res) => {
    const postObj = {
        text: req.body.text,
        userId: req.params.userId,
    };
    new Post(postObj).save((err, post) => {
        if (err) {
            return res.status(400).json({
                err: err,
                msg: "Could not post",
            });
        }
        res.json(post);
    });
};

exports.deletePost = (req, res) => {
    Post.findByIdAndDelete(req.post._id).exec((err, deletedPost) => {
        if (err) {
            return res.status(400).json({
                err: err,
                msg: "Could not delete post",
            });
        }
        res.json(deletedPost);
    });
};

exports.likePost = async (req, res) => {
    const userId = req.params.userId;
    const postId = req.params.postId;

    try {
        const post = await Post.findOne({ _id: postId });
        obj = { userId };
        post.likes.push(obj);
        const updatedPost = await post.save();
        res.json(updatedPost);
    } catch (error) {
        res.json(error);
    }
};

exports.numOfLikesOfPost = async (req, res) => {
    postId = req.params.postId;
    const post = await Post.findOne({ _id: postId });
    const numOfLikes = post.likes.length;
    res.json(numOfLikes);
};

exports.retweetPost = async (req, res) => {
    // Get userId and postId from params
    const userId = req.params.userId;
    const postId = req.params.postId;

    // Check if retweeted with comment
    const isComment = req.body.isComment;

    // Get comment if retweeted with comment
    let comment = "";
    if (isComment) {
        comment = req.body.comment;
    }

    try {
        // Find post
        const post = await Post.findOne({ _id: postId });

        // Set isRetweeted to True
        post.isRetweeted = true;

        // Make the retweet object
        const retweetObj = {
            userId,
            isComment,
            comment,
        };
        post.retweetDetails.push(retweetObj);

        // Save post
        const updatedPost = await post.save();
        res.json(updatedPost);
    } catch (error) {
        res.json(error);
    }
};
