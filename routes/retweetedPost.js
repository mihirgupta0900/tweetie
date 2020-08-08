const router = require("express").Router();

const { isSignedIn, isAdmin, isAuthenticated } = require("../controllers/auth");
const { getUserById } = require("../controllers/user");

const {
    retweetPost,
    retweetedPostsByAUser,
    retweetsOfAPost,
} = require("../controllers/retweetedPost");

router.param("userId", getUserById);

// Retweet a post
router.post(
    "/retweet/:postId/:userId",
    isSignedIn,
    isAuthenticated,
    retweetPost
);

// Get retweets by a user
router.get("/retweet/user/:userId", isSignedIn, retweetedPostsByAUser);

// Get retweets of a post
router.get("/retweet/post/:postId", isSignedIn, retweetsOfAPost);

module.exports = router;
