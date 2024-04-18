const express = require('express');

const tourController = require('../controller/tourController');
const authController = require('./../controller/authController');
const reviewController = require('./../controller/reviewController');
const reviewRouter = require('./../routes/reviewRouter');
const router = express.Router();

// Define your route for top 5 cheapest tours
router.use('/:tourId/reviews', reviewRouter);

router
  .route('/top-cheap-tours')
  .get(tourController.aliasTopCheapTours, tourController.getAllTours);

router.route('/tour-stats').get(tourController.getToursStats);

router
  .route('/tours-within/:distance/center/:latlng/unit/:unit')
  .get(tourController.getToursWithin);

router.route('/distance/').get(tourController.getDistances);
router.use(authController.protect);
router  
  .route('/monthly-plan/:year')
  .get(
    authController.restrictTo('admin', 'lead-guide', 'guide'),
    tourController.getMonthlyPlan
  );

router
  .route('/')
  .get(
    authController.restrictTo('admin', 'lead-guide'),
    tourController.getAllTours
  )
  .post(tourController.postTour);
router
  .route('/:id')
  .delete(
    authController.restrictTo('admin', 'lead-guide'),
    tourController.deleteTour
  )
  .patch(
    authController.restrictTo('admin', 'lead-guide'),
    tourController.patchTour
  )
  .get(tourController.getTour);

router.use('/:tourId/reviews', reviewRouter);

// router
//   .route('/:tourId/reviews')
//   .post(
//     authController.protect,
//     authController.restrictTo('user'),
//     reviewController.createReview
//   );
module.exports = router;
