const appError = require('../utils/appError');

const handleCastErrorDB = err => {
  const message = `Invalid ${err.path}:${err.value}`;
  return new appError(message, 400);
};
const handleDupDB = err => {
  const value = err.errmsg.match(/(["'])(?:(?=(\\?))\2.)*?\1/)[0];
  const message = `Duplicate the field value :${value} please use another`;
  return new appError(message, 400);
};

const handleValidationErrorDB = err => {
  const error = Object.values(err.error).map(el => el.message);
  const message = `invalid inputs ${error.join(',')}`;
  return new appError(message, 400);
};
const sendErrorProd = (err, res) => {
  if (err.isOperational) {
    res.status(err.statusCode).json({
      status: err.status,
      message: err.message
    });
  } else {
    res.status(500).json({
      status: 'error',
      message: 'pagal hai thode'
    });
  }
};
const sendErrorDev = (err, res) => {
  res.status(err.statusCode).json({
    status: err.status,
    error: err,
    message: err.message,
    stack: err.stack
  });
};

module.exports = (err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
  err.status = err.status || 'error';
  // if(process.env.NODE_ENV==='development')
  let error = { ...err };
  if (1) {
    // after production it will  be in the production site
    if (error.name === 'CastError') error = handleCastErrorDB(error);
    if (error.code === 11000) error = handleDupDB(error);
    if ((err.name === 'ValidatorError')) error = handleValidationErrorDB(error);

    sendErrorDev(err, res);
  } else if (1) {
    sendErrorProd(error, res);
  }
};
