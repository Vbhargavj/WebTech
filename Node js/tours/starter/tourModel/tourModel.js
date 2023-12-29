const mongoose = require('mongoose');

const TourScheme = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'A Tour must be have name'],
    unique: true
  },
  rating: {
    type: Number,
    default: 4.5
  },
  price: {
    type: Number,
    required: [true, 'A tour must be have price']
  }
});

const Tour = mongoose.model('Tour', TourScheme);

module.exports = Tour;
