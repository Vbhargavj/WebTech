const { promisify } = require('util');
const User = require('./../Model/userModel');
const catchAsync = require('./../utils/catchAsync');
const jwt = require('jsonwebtoken');
const appError = require('./../utils/appError');
const crypto = require('crypto');
const sendMail = require('./../utils/emails');

// this is return sign token
const signToken = id => {
  return jwt.sign({ id }, 'my name is bhargav', {
    expiresIn: '90d'
  });
};
// this is create and also send token
const createSendToken = (user, statusCode, res) => {
  const token = signToken(user._id);
  const cookieOption = {
    expires: new Date(Date.now() + 24 * 60 * 60000),
    // secure: true,
    httpOnly: true
  };
  res.cookie('jwt', token, cookieOption);
  user.password = undefined;
  res.status(statusCode).json({
    status: 'success',
    token,
    data: {
      user
    }
  });
};
// this is sign up the user
exports.singUp = catchAsync(async (req, res, next) => {
  const newUser = await User.create({
    name: req.body.name,
    email: req.body.email,
    password: req.body.password,
    confirmPassword: req.body.confirmPassword,
    photo: req.body.photo
  });

  const token = signToken(newUser._id);

  res.status(200).cookie('jwt', token);
  res.status(200).json({
    status: 'success',
    token
  });
});
// login user
exports.login = catchAsync(async (req, res, next) => {
  const { email, password } = req.body;
  // if email and password is empty
  if (!email || !password) {
    return next(new appError('Please provide email and passwords'));
  }

  const user = await User.findOne({ email }).select('+password');

  if (!user || !(await user.correctPassword(password, user.password))) {
    return next(new appError('Invalid email of password', 401));
  }
  const token = signToken(user._id);

  res.status(200).c
  ookie('jwt', token);
  res.status(200).json({
    status: 'success',
    token
  });
});

exports.logOut = (req, res) => {
  res.cookie('jwt', 'i am log out', {
    expires: new Date(Date.now() + 10000),
    httpOnly: true
  });
  res.status(200).json('success');
};
// check user is log in or not
exports.protect = catchAsync(async (req, res, next) => {
  let token;
  console.log(token);

  if (
    req?.headers?.authorization &&
    req?.headers?.authorization.startsWith('Bearer')
  ) {
    token = req.headers.authorization.split(' ')[1];
  } else if (req.cookies.jwt) {
    token = req.cookies.jwt;
  }
  if (!token) {
    return next(new appError('please first login', 400));
  }
  const decoded = await promisify(jwt.verify)(token, 'my name is bhargav');
  console.log(decoded);

  const currentUser = await User.findById(decoded.id);
  console.log(currentUser);
  if (!currentUser) {
    return next(
      new appError('The user belong the token is not now exists', 401)
    );
  }

  // this is after some time restoring
  // if (currentUser.changePasswordAfter(decoded.iat)) {
  //   console.log("i am here");
  //   return next(new appError('User recently changed the password', 401));
  // }
  // console.log('i am here 2');
  req.user = currentUser;
  res.locals.user = currentUser;
  next();
});

exports.isLoggedIn = async (req, res, next) => {
  try {
    if (req.cookies.jwt) {
      const decoded = await promisify(jwt.verify)(
        req.cookies.jwt,
        'my name is bhargav'
      );

      const currentUser = await User.findById(decoded.id);

      if (!currentUser) {
        return next();
      }

      res.locals.user = currentUser;
      return next();
    }
  } catch (err) {
    console.log(err);
  }
  next();
};

exports.restrictTo = (...role) => {
  return (req, res, next) => {
    if (!role.includes(req.user.role)) {
      return next(new appError('you are chotu so not use'), 403);
    }
    next();
  };
};


exports.forgotPassword = catchAsync(async (req, res, next) => {
  // Check if user is there
  const user = await User.findOne({ email: req.body.email });
  if (!user) {
    return next(new appError('Email is not exists ideot', 404));
  }
  // Generate resetToken
  const resetToken = user.createPasswordResetToken();
  // Save user with validateBeforeSave set to false
  await user.save({ validateBeforeSave: false });
  // Send reset Link with token
  const resetUrl = `${req.protocol}://${req.get(
    'host'
  )}/api/v1/users/resetPassword/${resetToken}`;
  const message = `Forgot password you can use patch request to along with new password with this url: ${resetUrl}. Note that this link is valid for only 10 mins.`;

  try {
    console.log(user.email);
    await sendMail({
      email: user.email,
      subject: 'Forgot your password',
      message
    });

    res.status(200).json({
      status: 'success',
      message: 'Email was sent'
    });
  } catch (err) {
    user.passwodResetToken = undefined;
    user.passwodResetTokenExpireIn = undefined;
    await user.save({ validateBeforeSave: false });
    return next(new appError('Something went wrong, email was not sent', 500));
  }
});

// reset using token id
exports.resetPassword = catchAsync(async (req, res, next) => {

  //take the token from user
  const hashedToken = crypto
    .createHash('sha256')
    .update(req.params.token)
    .digest('hex');

  // find user that have token and also chech expires
  const user = await User.findOne({
    passwodResetToken: hashedToken,
    passwodResetTokenExpireIn: { $gt: Date.now() }
  });
  console.log(user);

  // change the password and also make delete token and expires
  if (!user) {
    return next(new appError('Token is invalid or expired', 404));
  }
  user.password = req.body.password;
  user.confirmPassword = req.body.confirmPassword;
  user.passwodResetToken = undefined;
  user.passwodResetTokenExpireIn = undefined;
  await user.save();

  // this is work at the pre save
  // set new token
  const token = signToken(user._id);

  res.status(200).json({
    status: 'success',
    token
  });
});

// this is implement in the future


const filterObj = (obj, ...allowedFields) => {
  const newObj = {};
  Object.keys(obj).forEach(el => {
    if (allowedFields.includes(el)) newObj[el] = obj[el];
  });
  return newObj;
};

// this is update password using update token
exports.updateMe = catchAsync((req, res, next) => {
  if (req.body.password || req.body.confirmPassword) {
    return next(new appError('bhadve aukat me yeh karna ka nahi', 400));
  }

  const filterBody = filterObj(req.body, 'name', 'email');
  const updatedUser = User.findByIdAndUpdate(req.user.id, filterBody, {
    new: true,
    runValidators: true
  });
  res.status(200).json({
    status: 'success',
    data: {
      updatedUser
    }
  });
});

exports.deleteMe = catchAsync(async (req, res, next) => {
  await User.findByIdAndUpdate(req.user.id, { active: false });
  res.status(204).json({
    status: 'success',
    data: null
  });
});

exports.updatePassword = catchAsync(async (req, res, next) => {
  // 1) Get user from collection
  console.log("i am hit") 
  const user = await User.findById(req.user.id).select('+password');
  console.log("i am 2") 
  
  // 2) Check if POSTed current password is correct
  if (!(await user.correctPassword(req.body.passwordCurrent, user.password))) {
    return next(new appError('Your current password is wrong.', 401));
  }
  console.log("i am 3") 

  // 3) If so, update password
  user.password = req.body.password;
  user.passwordConfirm = req.body.passwordConfirm;
  await user.save();
  console.log('i am 4')
  // User.findByIdAndUpdate will NOT work as intended!

  // 4) Log user in, send JWT
  createSendToken(user, 200, res);
  console.log('i am 5') 
});
