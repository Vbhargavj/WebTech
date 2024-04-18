const express = require('express');

const userController = require('../controller/userController');
const authController = require('./../controller/authController');
const router = express.Router();

router.route('/signup').post(authController.singUp);
router.route('/login').post(authController.login);
router.route('/logout').post(authController.logOut);
router.route('/forgotpassword').post(authController.forgotPassword);
router.route('/resetPassword/:token').patch(authController.resetPassword);

router.use(authController.protect);

router.route('/updatepassword').patch(authController.updatePassword);
router.get('/me', userController.getMe, userController.getUser);

router.route('/updateMe').patch(userController.updateMe);
router.route('/deleteMe').delete(authController.deleteMe);

router.use(authController.restrictTo('admin'));

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
