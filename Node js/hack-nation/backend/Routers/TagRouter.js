const express = require("express");
const router = express.Router();

const tagController=require('../Controllers/TagController');
const authController=require('../Controllers/AuthController');


router.get('/getall',tagController.getAllTag);
router.post('/add',tagController.addTag);

module.exports = router;