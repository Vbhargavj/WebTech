const dotenv = require('dotenv');
const mongoose = require('mongoose');
const Tour = require('./../Model/tourModel');
const User = require('./../Model/userModel');
const Review = require('./../Model/reviewModel');
dotenv.config({ path: './config.env' });
const fs = require('fs');

const DB =
  'mongodb+srv://bbhaijbhai:Nr2kgWPRbTmVzQGU@cluster0.t9er7me.mongodb.net/?retryWrites=true&w=majority';

mongoose.connect(DB, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
  useUnifiedTopology: true
});

const tours = JSON.parse(
  fs.readFileSync(`${__dirname}/data/tours.json`, 'utf-8')
);
const users = JSON.parse(
  fs.readFileSync(`${__dirname}/data/users.json`, 'utf-8')
);
const reviews = JSON.parse(
  fs.readFileSync(`${__dirname}/data/reviews.json`, 'utf-8')
);

const deleteData = async () => {
  try {
    await User.deleteMany();
    await Tour.deleteMany();
    await Review.deleteMany();
    console.log('Data Deleted Succefully');
  } catch (err) {
    console.log(err);
  }
};
const importData = async () => {
  try {
    await User.create(users, { validateBeforeSave:false});
    await Tour.create(tours);
    await Review.create(reviews);
    console.log('Data Added Succefully');
  } catch (err) {
    console.log(err);
  }
};
const run = async () => {
  await deleteData();
  await importData();
  // Close the database connection after operations
  mongoose.connection.close();
};
run();
