const express = require('express');

const tourController = require('../controller/tourController');

const router = express.Router();

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
