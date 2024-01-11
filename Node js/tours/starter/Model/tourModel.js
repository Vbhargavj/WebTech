const mongoose = require('mongoose');

const slugify = require('slugify');
// you can use externel library
const validator = require('validator');
const TourScheme = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'A Tour must be have name'],
      unique: true,
      trim: true,
      maxlength: [40, 'Tour must have maximum 40 character'],
      minlength: [10, 'Tour must have minimum 10 character']
      // validate:[validator.isAlpha,"Tour must have charcters"]
    },
    slug: String,
    rating: {
      type: Number,
      default: 4.5
    },
    price: {
      type: Number,
      required: [true, 'A tour must be have price']
    },
    difficulty: {
      type: String,
      required: [true, 'Tour must have difficulty'],
      enum: {
        values: ['easy', 'medium', 'difficult'],
        message: 'The difficulty must be from easy,medium,difficult'
      }
    },
    ratingsAverage: {
      type: Number,
      default: 4.5,
      min: [1, 'rating must 1 or more value'],
      max: [5, 'rating must 5 or less values']
    },
    ratingsQuantity: {
      type: Number,
      default: 0
    },
    priceDiscount: {
      type: Number,
      validate: function(val) {
        return val < this.price;
      },
      message: `Price discouts should be below regular price`
    },
    summary: {
      type: String,
      required: [true, 'Summary is required'],
      trim: true
    },
    description: {
      type: String,
      required: [true, 'Tour must have Description'],
      trim: true
    },
    imageCover: {
      type: String,
      required: [true, 'Tour have images']
    },
    images: [String],
    createdAt: {
      type: Date,
      default: Date.now()
    },
    startDates: [Date],
    maxGroupSize: Number,
    secretTour: {
      type: Boolean,
      default: false
    }
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
  }
);

TourScheme.virtual('durationWeeks').get(function() {
  return this.duration / 7;
});
// this is only triger when use save() or create() method
TourScheme.pre('save', function(next) {
  this.slug = slugify(this.name, { lower: true });
  next();
});

TourScheme.pre('/^find/', function(next) {
  this.find({ secretTour: { $ne: true } });
  next();
});
TourScheme.pre('aggregate', function(next) {
  this.pipeline().unshift({ $match: { secretTour: { $ne: true } } });
  next();
});

// TourScheme.pre('save', function(next) {
//   console.log('Will saving docs');
//   next();
// });
// TourScheme.post('save', function(doc,next) {
//   console.log(doc);
//   next();
// });

const Tour = mongoose.model('Tour', TourScheme);

module.exports = Tour;
