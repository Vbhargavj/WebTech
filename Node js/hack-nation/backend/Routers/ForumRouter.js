const express = require("express");
const router = express.Router();

const forumController=require('../Controllers/ForumController');
const authController=require('../Controllers/AuthController');

router.use(authController.protect)
router.post("/addForum", forumController.addForum);
router.get('/getforum/:id',forumController.getForum);
router.get('/forums',forumController.getAllForum);

module.exports = router;