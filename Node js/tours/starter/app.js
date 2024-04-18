const path = require('path');
const express = require('express');
const morgan = require('morgan');
const AppError = require('./utils/appError');
const globalErrorController = require('./controller/errorConstroller');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const mongoSenitize = require('express-mongo-sanitize');
const xss = require('xss-clean');
const hpp = require('hpp');
const cookieParser = require('cookie-parser');
const cors=require('cors')
const app = express();

app.use(cors())

app.set('view engine', 'pug');
app.set('views', path.join(__dirname, 'views'));

app.use(express.static(path.join(__dirname, 'public')));
app.use(function(req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  next();
});
app.use(helmet());

const limiter = rateLimit({
  max: 2000,
  windowMs: 1 * 1,
  message:
    'you have make many request so you have make new request after 1 hour'
});
// app.use(rateLimit());
app.use(express.json());
app.use(cookieParser());

app.use(mongoSenitize());
// app.use(xss());
app.use(
  hpp({
    whitelist: [
      'duration',
      'sort',
      'ratingQuantity',
      'ratingsAverage',
      'difficulty',
      'price'
    ]
  })
);
const viewRouter = require('./routes/viewRouter');
const userRouter = require('./routes/userRouter');
const tourRouter = require('./routes/tourRouter');
const reviewRouter = require('./routes/reviewRouter');

app.use(morgan('dev'));

// app.use((req, res, next) => {
//   console.log(req);
//   next();
// });
app.use((req, res, next) => {
  console.log(req.cookies);
  next();
});

app.use('/', viewRouter);
app.use('/api/v1/tours', tourRouter);
app.use('/api/v1/user', userRouter);
app.use('/api/v1/review', reviewRouter);

app.use(globalErrorController);
app.all('*', (req, res, next) => {
  next(new AppError('page no found', 404));
});

module.exports = app;
