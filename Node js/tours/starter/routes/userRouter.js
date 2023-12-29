const express = require('express');

const userController = require('../controller/userController');

const router = express.Router();

router
  .route('/')
  .get(userController.getAllUser)
  .post(userController.postUser);

router
  .route('/:id')
  .get(userController.deleteUser)
  .patch(userController.patchUser)
  .get(userController.getUser);

module.exports = router;
