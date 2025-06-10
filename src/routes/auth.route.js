const express = require("express");
const { signup, requestPasswordReset, resetPassword } = require("./../controllers/auth.controller");
const { login, logout } = require("./../controllers/auth.controller");


const router = express.Router();



router.post("/signup", signup);
router.post("/login", login);
router.post("/logout", logout);
router.post("/forgot-password", requestPasswordReset);
router.post("/reset-password/:token", resetPassword);

module.exports = router;
