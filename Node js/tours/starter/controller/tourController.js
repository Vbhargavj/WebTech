const Tour = require('../Model/tourModel');
const APIFeautes = require('./../utils/APIFeatures');
const appError = require('./../utils/appError');
const catchAsync = require('./../utils/catchAsync');
exports.aliasTopCheapTours = (req, res, next) => {
  req.query.limit = '5';
  req.query.sort = 'price';
  req.query.fields = 'name, price, ratingsAverage, summary, difficulty';

  next();
};
exports.getAllTours = catchAsync(async (req, res) => {
  console.log(req.query);
  // // advanched filtering is here
  // queryStr = queryStr.replace('/\b(gt|lt|lte|gte)\b/g', match => `$${match}`);
  // const query = Tour.find(JSON.parse(queryStr));

  // sorting is here
  // if (req.query.sort) {
  //   const sortBy = req.query.sort.split(',').join(' ');
  //   query = query.sort(sortBy);
  // } else {
  //   // default sorting
  //   query = query.sort('-price');
  // }
  // fielding is here
  // if (req.query.fields) {
  //   const fields = req.query.split(',').join(' ');
  //   query = query.select(fields);
  // } else {
  //   query = query.select('-__v');
  // }
  // pagination is here
  // if (req.query.page) {
  //   const page = req.query.page * 1;
  //   const limit = req.query.limit * 1 || 100;
  //   const skip = (page - 1) * limit;
  //   const numTours = await Tour.countDocuments();
  //   if (skip > numTours) throw new Error('this is wrong way');
  //   query = query.skip(skip).limit(limit);
  // }
  // execute the query
  const apiFeautes = new APIFeautes(Tour.find(), req.query)
    .filter()
    .limitFields()
    .paginate()
    .sort();
  const tours = await apiFeautes.query;

  // const tours = await Tour.find()
  //   .where('duration')
  //   .equals(5)
  //   .where('dificulty')
  //   .equals('easy');

  res.status(200).json({
    status: 'success',
    result: tours.length,
    data: { tours }
  });
});

exports.getTour = catchAsync(async (req, res, next) => {
  const tour = await Tour.findById(req.params.id);
  if (!tour) {
    return next(new appError('Invalid id '), 404);
  }
  res.status(200).json({
    status: 'success',
    data: {
      tour
    }
  });
});

exports.postTour = catchAsync(async (req, res, next) => {
  const newTour = await Tour.create(req.body);
  res.status(201).json({
    status: 'success',
    data: {
      tour: newTour
    }
  });
});

exports.patchTour = catchAsync(async (req, res, next) => {
  const tour = await Tour.findByIdAndUpdate(req.params.id, req.body, {
    runValidators: true,
    new: true
  });
  res.status(200).json({
    status: 'success',
    data: {
      tour
    }
  });
});

exports.deleteTour = catchAsync(async (req, res, next) => {
  await Tour.findByIdAndDelete(req.params.id);
  res.status(204).json({
    status: 'success',
    data: {
      data: null
    }
  });
});

exports.getToursStats = catchAsync(async (req, res, next) => {
  const stats = await Tour.aggregate([
    {
      $match: { ratingsAverage: { $gte: 4.5 } }
    },
    {
      $group: {
        _id: '$difficulty',
        avgRating: { $avg: '$ratingsAverage' },
        numTours: { $sum: 1 },
        avgPrice: { $avg: '$price' },
        minPrice: { $min: '$price' },
        maxPrice: { $max: '$price' }
      }
    },
    {
      $sort: { avgPrice: 1 }
    },
    {
      $match: { _id: { $ne: 'easy' } }
    }
  ]);
  res.status(200).json({
    status: 'success',
    data: {
      stats
    }
  });
});

exports.getMonthlyPlan = catchAsync(async (req, res, next) => {
  const year = req.params.year * 1;
  const plan = await Tour.aggregate([
    {
      $unwind: '$startDates'
    },
    {
      $match: {
        startDates: {
          $gte: new Date(`${year}-01-01`),
          $lte: new Date(`${year}-12-31`)
        }
      }
    },
    {
      $group: {
        _id: { $month: '$startDates' },
        numToursStarts: { $sum: 1 },
        tours: { $push: '$name' }
      }
    },
    {
      $project: {
        _id: 0
      }
    },
    {
      $sort: { numToursStarts: -1 }
    },
    {
      $limit: 12
    }
  ]);
  res.status(200).json({
    status: 'success',
    result: plan.length,
    data: {
      plan
    }
  });
});
