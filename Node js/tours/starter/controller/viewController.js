const catchAsync = require('./../utils/catchAsync');
const Tour = require('./../Model/tourModel');
const AppError = require('./../utils/appError');
exports.getOverview = catchAsync(async (req, res) => {
  const tours = await Tour.find();
  res.status(200).render('overview', {
    title: 'All tour',
    tours
  });
});

exports.getTour = catchAsync(async (req, res, next) => {
  const tour = await Tour.findOne({ slug: req.params.slug }).populate({
    path: 'reviews',
    fields: 'review rating user'
  });
  if (!tour) return next(new AppError('tour is not found with name', 400));
  
  res.status(200).render('tour', {
    title: `${tour.name}`,
    tour
  });
});

exports.getLoginForm = catchAsync(async (req, res, next) => {
  res.status(200).render('login', {
    title: 'Login into the natours'
  });
});

exports.getAccount = catchAsync(async (req, res, next) => {
  res.status(200).render('account', {
    title: 'Your Account'
  });
});
