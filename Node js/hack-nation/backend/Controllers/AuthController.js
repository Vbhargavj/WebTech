const jwt = require("jsonwebtoken");
const User = require("../Model/UserModel");
const { promisify } = require("util");
const crypto = require('crypto')
const { log } = require("console");
const CatchAsync = require("../utils/CatchAsync");
const AppError = require("../utils/AppError");
const signToken = async (id) => {
  console.log(id);
  return await jwt.sign({ id }, "my name is", {
    expiresIn: "90d",
  });
};

const createAndSendToken = async (id, res) => {
  const token = await signToken(id);
  const cookieOptions = {
    expires: new Date(Date.now() + 24 * 60 * 60 * 1000), // 24 hours
    httpOnly: true,
     secure: true, // Uncomment this in production
    sameSite: 'none' // Optional, but good practice for CSRF protection
  };

  res.cookie('jwt', token, cookieOptions);
  res.status(200).json({ status: "success", token });
};


exports.signup = CatchAsync(async (req, res) => {
  const { name, email, password, confirmpassword } = req.body;
  console.log(req.body);
  console.log(name, email, password, confirmpassword);
  console.log(1);
  if (!email || !password) {
    console.log(name, email, password, confirmpassword);
    return next(new AppError('password or email should not empty', 401))
  }
  const existingUser = await User.findOne({ email });
  if (existingUser) {
    return res.status(409).json({ message: 'Email already exists' });
  }
  const newUser = await User.create({
    name,
    email,
    password,
    confirmpassword,
  });

  createAndSendToken(newUser._id, res);
});

exports.login = CatchAsync(async (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return next(new AppError('Please provide email and password', 400));
  }

  const user = await User.findOne({ email }).select('+password');
  if (!user) {
    return next(new AppError("User not found. Please sign up.", 404));
  }

  const isPasswordCorrect = await user.correctPassword(password, user.password);
  if (!isPasswordCorrect) {
    return next(new AppError('Incorrect email or password', 401));
  }

  createAndSendToken(user._id, res);
});

exports.protect = CatchAsync(async (req, res, next) => {
  let token;
  if (
    req?.headers?.authorization ||
    req?.headers?.authorization?.startWith("Bearer")
  ) {
    token = req?.headers?.authorization.split(" ")[1];
  } else if (req.cookies?.jwt) {
    token = req.cookies.jwt;
  }
  if (!token) {
    return next(new AppError('unauthorized', 401));
  }
  const decoded = await promisify(jwt.verify)(token, "my name is");
  const currentUser = await User.findById(decoded.id);
  if (!currentUser) {

    return next(new AppError('internal error', 500));
  }

  req.user = currentUser;
  res.locals.user = currentUser;
  next();
});

exports.forgotPassword = CatchAsync(async (req, res, next) => {
  // Check if user is there
  const user = await User.findOne({ email: req.body.email });
  if (!user) {
    return next(new AppError('Email is not exists ideot', 404));
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
    return next(new AppError('Something went wrong, email was not sent', 500));
  }
});

// reset using token id
exports.resetPassword = CatchAsync(async (req, res, next) => {

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
    return next(new AppError('Token is invalid or expired', 404));
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

exports.logOut = (req, res) => {
  res.cookie('jwt', 'i am log out', {
    expires: new Date(Date.now() + 10000),
    httpOnly: true
  });
  res.status(200).json('success');
};

exports.isLoggedIn = async (req, res, next) => {
  try {
    if (req.cookies.jwt) {
      const decoded = await promisify(jwt.verify)(
        req.cookies.jwt,
        'my name is'
      );

      const currentUser = await User.findById(decoded.id);

      if (!currentUser) {
        return next(new AppError("user not login",401));
      }

      res.locals.user = currentUser;
      res.json({ loggedIn: true, user: res.locals.user });
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
      return next(new AppError('you are chotu so not use'), 403);
    }
    next();
  };
};


const filterObj = (obj, ...allowedFields) => {
  const newObj = {};
  Object.keys(obj).forEach(el => {
    if (allowedFields.includes(el)) newObj[el] = obj[el];
  });
  return newObj;
};

exports.updateMe = CatchAsync((req, res, next) => {
  if (req.body.password || req.body.confirmPassword) {
    return next(new AppError('bhadve aukat me yeh karna ka nahi', 400));
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