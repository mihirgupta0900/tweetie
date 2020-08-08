const router = require("express").Router();
const { check } = require("express-validator");
const { signup, signin } = require("../controllers/auth");

router.post(
    "/signup",
    [
        check("email").isEmail().withMessage("Should be a valid email"),
        check("password")
            .isLength({ min: 4 })
            .withMessage("Password should have min 4 characters"),
    ],
    signup
);

router.post('/signin', signin)

module.exports = router;
