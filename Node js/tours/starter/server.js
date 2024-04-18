const dotenv = require('dotenv');
const mongoose = require('mongoose');
process.on('uncaughtException', err => {
  console.log('uncaughtException');
  console.log(err, 'Shuting down');
  process.exit(1);
});
const app = require('./app');
const Tour = require('./Model/tourModel');
dotenv.config({ path: './config.env' });

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
    console.log('here i am online http://localhost:3000/');
  });

process.on('unhandledRejection', err => {
  console.log('Unhandeldrejection');
  console.log(err);

  process.exit(1);
});

// const testTour = new Tour({
//   name: 'The bhargav special',
//   price: 888,
//   rating: 4.7
// });
// testTour
//   .save()
//   .then(doc => {
//     console.log(doc);
//   })
//   .catch(err => {
//     console.log(err);
//   });

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`App running on port ${port}...`);
});
