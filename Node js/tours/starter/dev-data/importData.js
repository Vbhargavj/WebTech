const dotenv = require('dotenv');
const mongoose = require('mongoose');
const Tour = require('./../tourModel/tourModel');
dotenv.config({ path: './config.env' });
const fs = require('fs');

const DB =
  'mongodb+srv://bbhaijbhai:Nr2kgWPRbTmVzQGU@cluster0.t9er7me.mongodb.net/?retryWrites=true&w=majority';

mongoose
  .connect(DB, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true
  })
  .then(() => {
    console.log('I am connect succesfully');
  });
const tours = JSON.parse(
  fs.readFileSync(`${__dirname}/data/tours-simple.json`, 'utf-8')
);

const deleteData = async () => {
  try {
    await Tour.deleteMany();
    console.log('Data Deleted Succefully');
  } catch (err) {
    console.log(err);
  }
};
const importData = async () => {
  try {
    await Tour.create(tours);
    console.log('Data Added Succefully');
  } catch (err) {
    console.log(err);
  }
};
// deleteData();
importData();
