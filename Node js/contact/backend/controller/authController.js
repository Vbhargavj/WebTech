const jwt = require("jsonwebtoken");
const User = require("../../model/userModel");
const CatchAsync = require("../../utils/CatchAsync");
const AppError = require("../../utils/AppError");
const { promisify } = require("util");
const bcrypt = require("bcryptjs");
const { sign } = require("crypto");

const createToken = (id) => {
  return jwt.sign({ id }, "my name vbj", { expiresIn: "90d" });
};
const createSendToken = (user, statusCode, res) => {
  const token = signToken(user._id);
  const cookieOption = {
    expires: new Date(Date.now() + 24 * 60 * 60000),
    // secure: true,
    httpOnly: true,
  };
  res.cookie("jwt", token, cookieOption);
  user.password = undefined;
  res.status(statusCode).json({
    status: "success",
    token,
    data: {
      user,
    },
  });
};

exports.signUp = CatchAsync(async (req, res, next) => {
  const { name, email, password, confirmPassword } = req.body;
  console.log(req.body);
  console.log(name, email, password, confirmPassword);
  const newUser = await User.create({
    name,
    email,
    password,
    confirmPassword,
  });
  const token = createToken(newUser._id);
  res.status(200).cookie("jwt", token);
  res.status(200).json({
    status: "success",
    token,
  });
});

exports.login = CatchAsync(async (req, res, next) => {
  const email = req.body.email;
  const password = req.body.password;
  console.log(req.body);
  if (!email || !password) {
    return next(new AppError("fuck you", 400));
  }
  const user = await User.findOne({ email }).select("+password");

  if (!user || !(await user.correctPassword(password, user.password))) {
    return next(new AppError("fuck you", 400));
  }
  const token = createToken(user._id);

  res.status(200).cookie(token);
  res.status(200).json({
    status: "success",
    token,
  });
});
exports.protect = CatchAsync(async (req, res, next) => {
  let token;
  if (
    req?.headers?.authorization &&
    req?.headers?.authorization.startsWith("Bearer")
  ) {
    token = req.headers.authorization.split(" ")[1];
  } else if (req.cookie.jwt) {
    token = req.cookie.jwt;
  }
  if (!token) {
    return next(new AppError("fuck you", 400));
  }
  const decoded = await promisify(jwt.verify)(token, "my name vbj");

  const currentUser = User.findById(decoded.id);

  if (!currentUser) {
    return next(new AppError("Fuck you again", 400));
  }
  req.user = currentUser;
  res.locals.user = currentUser;
  next();
});

exports.restricTo = (...role) => {
  return (req, res, next) => {
    if (!role.includes(req.user.role)) {
      return next(new AppError("fuck you again ", 400));
    }
    next();
  };
};

exports.isLogin = CatchAsync(async (req, res, next) => {
  // chech if user can login
  try {
    if (req.cookie.jwt) {
      const decoded = await promisify(jwt.verify)(
        req.cookie.jwt,
        "my name vbj"
      );
      const currentUser = await User.findById(decoded.id);
      if (!currentUser) {
        return next();
      }
      res.locals.user = currentUser;
      return next();
    }
  } catch (error) {
    console.log("eff");
  }
  next();
});

exports.updatePassword = CatchAsync(async (req, res, next) => {
  // check if user login or not
  const user = await User.findById(req.user.id).select("+password");

  if (!(await user.correctPassword(req.body.password, user.password))) {
    return next(new AppError("fuck you", 400));
  }
  user.password = req.body.password;
  user.passworConfirm = req.body.passworConfirm;
  await user.save();
  createSendToken(user, 200, res);
});
const filterObj = (obj, ...fields) => {
  const newObj = {};
  Object.keys(obj).forEach((el) => {
    if (fields.includes(el)) newObj[el] = obj[el];
  });
  return newObj;
};

exports.updateMe = CatchAsync(async (req, res, next) => {
  if (req.body.password || req.body.confirmPassword) {
    return next(new AppError(403, "aukat me"));
  }
  const fObj = filterObj(req.body, "name", "email");
  const updateUser = User.findByIdAndUpdate(req.user._id, fObj, {
    new: true,
    runValidators: true,
  });
  res.status(200).json({
    status: "success",
    data: {
      updateUser,
    },
  });
});
