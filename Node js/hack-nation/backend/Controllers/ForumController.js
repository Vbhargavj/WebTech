const CatchAsync = require("../utils/CatchAsync");
const Forum = require("../Model/FormsModel");
const AppError = require("../utils/AppError");
const mongoose = require('mongoose')

exports.addForum = CatchAsync(async (req, res, next) => {
  const newForum = await Forum.create({
    title: req.body.title,
    description: req.body.description,
    category: req.body.category,
    user: req.user._id,
  });
  if (!newForum) {

    return next(new AppError('something error in crating tag'))
  }
  res.json({ status: "success", msg: "created" });
});

exports.updateForm = (req, res, next) => {
  const id = req.params.id;
};

exports.getForum = CatchAsync(async (req, res, next) => {
  const id = req.params.id;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return next(new AppError('Invalid forum ID', 400));
  }

  const result = await Forum.findOne({ _id: id })
    .populate({
      path: "user",
      select: "name",
    });

  if (!result) {
    return next(new AppError("forum with id " + id + " not found", 404));
  }

  res.status(200).json({ result });
});


exports.getAllForum = CatchAsync(async (req, res, next) => {

  console.log("REq fuck me");

  const result = await Forum.find()
    .populate({
      path: "user",
      fields: "name",
    });
  if (!result) {
    return next(new AppError("forum with id" + id + " not found", 404));
  }
  res.status(200).json({ result });
});

