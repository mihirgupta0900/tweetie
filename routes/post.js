const router = require("express").Router();
const {
    createPost,
    getPostById,
    deletePost,
    likePost,
    numOfLikesOfPost,
} = require("../controllers/post");
const { isSignedIn, isAdmin, isAuthenticated } = require("../controllers/auth");
const { getUserById } = require("../controllers/user");

// Router PARAMS
router.param("userId", getUserById);
router.param("postId", getPostById);

// Create Post Route
router.post("/post/create/:userId", isSignedIn, isAuthenticated, createPost);

// Delete Post Route
router.delete(
    "/post/delete/:postId/:userId",
    isSignedIn,
    isAuthenticated,
    deletePost
);

// Like Routes
router.post(
    "/post/like/:postId/:userId",
    isSignedIn,
    isAuthenticated,
    likePost
);

router.get("/post/likesNo/:postId", numOfLikesOfPost);

module.exports = router;
