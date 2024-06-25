const User = require("../Models/userModel");
const jwt = require("jsonwebtoken");
const { promisify } = require("util");
const signToken = async (id) => {
    return jwt.sign({ id }, "my name is", {
      expiresIn: "90d",
    });
};

const createAndSendToken = async (id, res) => {
  const token = await signToken(id);
  res.json({
    msg: "ok",
    token,
  });
};

exports.signup = async (req, res) => {
  const newUser = await User.create({
    name: req.body.name,
    email: req.body.email,
    password: req.body.password,
    confirmpassword: req.body.confirmpassword,
  });
  createAndSendToken(newUser._id, res);
};

exports.signin = async (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password) {
    res.json({ status: "fail", msg: "can not email or password empty " });
    return next();
  }

  const user = await User.findOne({ email });

  if (!user || !(await user.correctPassword(password, user.password))) {
    res.json({
      status: "fail",
      msg: "user not found",
    });
    return next();
  }
  //   some portion is not complete
  createAndSendToken(user._id, res);
};

exports.protect = async (req, res, next) => {
  let token;
  if (
    req?.headers?.authorization ||
    req?.headers?.authorization.startWith("Bearer")
  ) {
    token = req?.headers?.authorization.split(" ")[1];
  } else if (req.cookies.jwt) {
    token = req.cookies.jwt;
  }
  if (!token) {
    res.json({
      status: "ok",
      msg: "Unahorized",
    });
    return next();
  }
  const decoded = await promisify(jwt.verify)(token, "my name is");
  const currentUser = await User.findById(decoded.id);
  if (!currentUser) {
    res.json({ msg: "fail" });
    return next();
  }
  req.user = currentUser;
  res.locals.user = currentUser;
};
