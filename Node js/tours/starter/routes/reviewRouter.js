const express = require('express');

const reviewController = require('./../controller/reviewController');
const authController = require('./../controller/authController');

const router = express.Router({ mergeParams: true });

router.use(authController.protect);

router
  .route('/')
  .get(reviewController.getAllReview)
  .post(
    authController.restrictTo('user'),
    reviewController.setToursUserId,
    reviewController.createReview
  );
router
  .route('/:id')
  .get(reviewController.getReview)
  .delete(
    authController.restrictTo('admin', 'user'),
    reviewController.deleteReview
  )
  .patch(
    authController.restrictTo('user', 'admin'),
    reviewController.updateReview
  );
// router
//   .route('/getAllReview')
//   .get(
//     authController.protect,
//     authController.restrictTo('user'),
//     reviewController.getAllReview
//   );€

module.exports = router;
