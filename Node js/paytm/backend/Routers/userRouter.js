const express = require("express");

const router=express.Router();
const userController=require('../controllers/userController.js')
const authController=require('../controllers/authController.js')

router.post('/signup',authController.signup)
router.post('/signin',authController.signin)
router.post('/transist',userController.transist)
module.exports=router