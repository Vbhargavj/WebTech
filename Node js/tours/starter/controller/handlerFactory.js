const AppError = require('../utils/appError');
const catchAsync = require('./../utils/catchAsync');
const APIFeatures = require('../utils/APIFeatures');

exports.deleteOne = Model =>
  catchAsync(async (req, res, next) => {
    const doc = await Model.findByIdAndDelete(req.params.id);

    if (!doc) {
      return new AppError('the doc is not found with id', 400);
    }
    res.status(200).json({
      status: 'success',
      message: 'doc deleted successfully',
      data: doc
    });
  });

exports.updateOne = Model =>
  catchAsync(async (req, res, next) => {
    const doc = await Model.findByIdAndUpdate(req.params.id, req.body, {
      runValidators: true,
      new: true
    });
    if (!doc) return new AppError('The doc is not found', 400);
    res.status(200).json({
      status: 'success',
      data: {
        doc
      }
    });
  });

exports.createOne = Model =>
  catchAsync(async (req, res, next) => {
    const newDoc = await Model.create(req.body);
    res.status(201).json({
      status: 'success',
      data: {
        data: newDoc
      }
    });
  }); 

exports.getOne = (Model, PopOption) =>
  catchAsync(async (req, res, next) => {
    let query;
    if (PopOption) {
      query = Model.findById(req.params.id).populate(PopOption);
    } else {
      query = Model.findById(req.params.id);
    }
    const doc = await query;
    if (!doc) {
      return next(new AppError('Invalid id '), 404);
    }
    res.status(200).json({
      status: 'success',
      data: {
        doc
      }
    });
  });

exports.getAll = Model =>
  catchAsync(async (req, res) => {

    let filter
    if(req.params.tourId) filter = req.params.tourId;
    const apiFeauters = new APIFeatures(Model.find(filter), req.query)
      .filter()
      .limitFields()
      .paginate()
      .sort();
    const doc = await apiFeauters.query;

    res.status(200).json({
      status: 'success',
      result: doc.length,
      data: { doc }
    });
  });
