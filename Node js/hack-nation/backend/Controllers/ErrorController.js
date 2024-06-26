require('dotenv').config();
const AppError = require('./../utils/appError');

const handleCastErrorDB = err => {
  const message = `Invalid ${err.path}: ${err.value}.`;
  return new AppError(message, 400);
};

const handleDuplicateFieldsDB = err => {

  if (err.errmsg) {
    // Use a regular expression to find the duplicated field value
    const valueMatch = err.errmsg.match(/(["'])(\\?.)*?\1/)
    console.log('this is value,a', valueMatch);
    const value = valueMatch[0];
    const message = `Duplicate field value: ${value}. Please use another value!`;
    return new AppError(message, 400);
  }
};

const handleValidationErrorDB = err => {
  const errors = Object.values(err.errors).map(el => el.message);

  const message = `Invalid input data. ${errors.join('. ')}`;
  return new AppError(message, 400);
};

const handleJWTError = () =>
  new AppError('Invalid token. Please log in again!', 401);

const handleJWTExpiredError = () =>
  new AppError('Your token has expired! Please log in again.', 401);

const sendErrorDev = (err, req, res) => {
  // A) API
  // console.log(req.originalUrl);
  console.log(err);
  if (req.originalUrl.startsWith('/api')) {
    return res.status(err.statusCode).json({
      status: err.status,
      error: err,
      message: err.message,
      stack: err.stack
    });
  }

  // B) RENDERED WEBSITE
  console.error('ERROR 💥', err);
  return res.status(err.statusCode).render('error', {
    title: 'Something went wrong!',
    msg: err.message
  });
};

const sendErrorProd = (err, req, res) => {
  // A) API
  // console.log(err);
  if (req.originalUrl.startsWith('/api')) {
    // A) Operational, trusted error: send message to client
    if (err.isOperational) {
      return res.status(err.statusCode).json({
        status: err.status,
        message: err.message
      });
    }
    // B) Programming or other unknown error: don't leak error details
    // 1) Log error
    console.error('ERROR 💥', err);
    // 2) Send generic message
    return res.status(500).json({
      status: 'error',
      message: 'Something went very wrong!'
    });
  }

  // B) RENDERED WEBSITE
  // A) Operational, trusted error: send message to client
  if (err.isOperational) {
    console.log(err);
    return res.status(err.statusCode).render('error', {
      title: 'Something went wrong!',
      msg: err.message
    });
  }
  // B) Programming or other unknown error: don't leak error details
  // 1) Log error
  console.error('ERROR 💥', err);
  // 2) Send generic message
  return res.status(err.statusCode).render('error', {
    title: 'Something went wrong!',
    msg: 'Please try again later.'
  });
};

module.exports = (err, req, res, next) => {
  // console.log(err.stack);
  // console.log(err);

  err.statusCode = err.statusCode || 500;
  err.status = err.status || 'error';
  console.log(process.env.NODE_ENV)
  if (process.env.NODE_ENV === 'development') {
    console.log("dev");
    sendErrorDev(err, req, res);
  }
  else if (process.env.NODE_ENV === 'production') {
    console.log("prod");
    let error = {
      ...err,
      name: err.name,
      message: err.message,
      code: err.code,
      errmsg: err.errmsg,
      path: err.path,
      value: err.value,
      errors: err.errors
    };
    error.message = err.message;
    // console.log(err)
    // console.log(error);
    if (error.name === 'CastError') error = handleCastErrorDB(error);
    if (error.name === 'ValidationError') error = handleValidationErrorDB(error);
    if (error.name === 'JsonWebTokenError') error = handleJWTError();
    if (error.name === 'TokenExpiredError') error = handleJWTExpiredError();

    if (error.code === 11000) error = handleDuplicateFieldsDB(error);

    sendErrorProd(error, req, res);
  }
  else {
    res.status(500).json({ msg: "fuck" })
  }
};
