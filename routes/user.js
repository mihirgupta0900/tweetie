const router = require("express").Router();
const {
    getUserById,
    getUser,
    updateUser,
    followUser,
    deleteUser,
    userFollowers,
    userFollowing,
    getUserByUserName,
} = require("../controllers/user");
const { isSignedIn, isAuthenticated } = require("../controllers/auth");

router.param("userId", getUserById);

router.get("/user/:userId", isSignedIn, getUser);
router.put("/user/update/:userId", isSignedIn, isAuthenticated, updateUser);
router.delete("/user/delete/:userId", isSignedIn, isAuthenticated, deleteUser);

// Get user by username ==> PARTIAL SEARCH
router.get("/users/search/:userId", isSignedIn, getUserByUserName);

/* :userIdTarget is the user the :userId is going to follow */
router.post(
    "/user/follow/:userId/:userIdTarget",
    isSignedIn,
    isAuthenticated,
    followUser
);
router.get(
    "/user/followers/:userId",
    isSignedIn,
    userFollowers
);
router.get(
    "/user/following/:userId",
    isSignedIn,
    userFollowing
);

module.exports = router;
