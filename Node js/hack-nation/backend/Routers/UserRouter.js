const express = require("express");

const router = express.Router();
const userController = require("../Controllers/UserController");
const authController = require("../Controllers/AuthController");
router.post("/login", authController.login);
router.post("/signup", authController.signup);
router.get('/isLogin',authController.isLoggedIn)

module.exports = router;
