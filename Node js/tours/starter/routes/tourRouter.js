const express = require('express');

const tourController = require('../controller/tourController');

const router = express.Router();

// Define your route for top 5 cheapest tours
router
  .route('/top-cheap-tours')
  .get(tourController.aliasTopCheapTours, tourController.getAllTours);
  
router.route('/tour-stats').get(tourController.getToursStats);
router.route('/monthly-plan/:year').get(tourController.getMonthlyPlan);

router
  .route('/')
  .get(tourController.getAllTours)
  .post(tourController.postTour);
router
  .route('/:id')
  .delete(tourController.deleteTour)
  .patch(tourController.patchTour)
  .get(tourController.getTour);

module.exports = router;
