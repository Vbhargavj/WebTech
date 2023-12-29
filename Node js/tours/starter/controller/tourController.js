const fs = require('fs');
const Tour = require('./../tourModel/tourModel');

// const tours = JSON.parse(
//   fs.readFileSync(
//     `D:/coding/Code/WebTech/Node js/tours/starter/dev-data/data/tours-simple.json`
//   )
// );

exports.getAllTours = (req, res) => {
  res.status(200).json({
    status: 'success'
    // result: tours.length,
    // data: { tours }
  });
};

exports.getTour = (req, res) => {
  const id = req.params.id * 1;
  // const tour = tours.find(el => el.id === id);

  // if (!tour) {
  //   return res.status(404).json({
  //     status: 'failed',
  //     message: 'not found'
  //   });
  // }

  // res.status(200).json({
  //   status: 'success',
  //   data: {
  //     tour
  //   }
  // });
};

exports.postTour = async (req, res) => {
  console.log(req.body);
  // const newId = tours.length - 1;
  // const newTour = Object.assign({ id: newId }, req.body);

  const newTour = await Tour.create(req.body);

  // tours.push(newTour);

  // fs.writeFile(
  //   `${__dirname}/dev-data/data/tours-simple.json`,
  //   JSON.stringify(tours),
  //   err => {
  //     if (err) console.log(err);
  try {
    res.status(201).json({
      status: 'success',
      data: {
        tour: newTour
      }
    });
  } catch (err) {
    console.log(err);
  }
  //   }
  // );
};

exports.patchTour = (req, res) => {
  // if (req.params.id * 1 > tours.length) {
  //   return res.status(404).json({
  //     status: 'failed',
  //     message: 'not found'
  //   });
  // }
  // res.status(200).json({
  //   status: 'success',
  //   data: {
  //     tour: '<In future it will be update>'
  //   }
  // });
};

exports.deleteTour = (req, res) => {
  if (req.params.id * 1 > tours.length) {
    return res.status(404).json({
      status: 'failed',
      message: 'not found'
    });
  }

  res.status(204).json({
    status: 'success',
    data: {
      tour: null
    }
  });
};
