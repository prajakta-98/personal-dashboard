const express = require("express");
const router = express.Router();
const { registerUser, loginUser, getCurrentUser } = require("../controllers/authController");
const verifyToken = require("../middleware/auth");
//Public routes
router.post("/register", registerUser);
router.post("/login", loginUser);

//Protected routes
router.get("/me",verifyToken, getCurrentUser);

module.exports = router;
