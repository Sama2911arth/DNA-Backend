const express = require("express");
const authenticateUser = require("./../middleware/auth.middleware");
const prisma = require("../config/db");
const { getUserProfile } = require("../controllers/user.controller");
const router = express.Router();


router.get("/profile", authenticateUser, getUserProfile)

module.exports = router;
