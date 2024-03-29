const express = require('express');
const app = express();

app.use(express.json());
const AppError = require('./utils/appError');
const globalErrorController = require('./controller/errorConstroller');

const userRouter = require('./routes/userRouter');
const tourRouter = require('./routes/tourRouter');

// TODO:MAKE USERROUTER AND TOUR ROUTER DONE:
app.use('/api/v1/tours', tourRouter);
app.use('/api/v1/user', userRouter);

app.all('*', (req, res, next) => {
  next(new AppError('Pagal hain thode', 404));
});

app.use(globalErrorController);

// app.route("/api/v1/users").get(getAllUser).post(postUser);
// app.route("/api/v1/tours/:id").get(deleteUser).patch(patchUser).get(getUser);

// app.route("/api/v1/tours").get(getAllTours).post(postTour);
// app.route("/api/v1/tours/:id").delete(deleteTour).patch(patchTour).get(getTour);

module.exports = app;
