const User = require('./../Model/userModel');
const catchAsync = require('./../utils/catchAsync');

exports.singUp = catchAsync(async (req, res, next) => {
  const newUser = await User.create(req.body);

  res.status(201).json({
    status: 'success',
    data: {
      user: newUser
    }
  });
});
