"use strict";

var catchAsync = require('./../utils/catchAsync');

var Tour = require('./../Model/tourModel');

exports.getOverview = catchAsync(function _callee(req, res) {
  var tours;
  return regeneratorRuntime.async(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.next = 2;
          return regeneratorRuntime.awrap(Tour.find());

        case 2:
          tours = _context.sent;
          res.status(200).render('overview', {
            title: 'All tour',
            tours: tours
          });

        case 4:
        case "end":
          return _context.stop();
      }
    }
  });
});
exports.getTour = catchAsync(function _callee2(req, res, next) {
  var tour;
  return regeneratorRuntime.async(function _callee2$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          _context2.next = 2;
          return regeneratorRuntime.awrap(Tour.findOne({
            slug: req.params.slug
          }).populate({
            path: 'reviews',
            fields: 'review rating user'
          }));

        case 2:
          tour = _context2.sent;
          res.status(200).render('tour', {
            title: "".concat(tour.name),
            tour: tour
          });

        case 4:
        case "end":
          return _context2.stop();
      }
    }
  });
});
exports.getLoginForm = catchAsync(function _callee3(req, res, next) {
  return regeneratorRuntime.async(function _callee3$(_context3) {
    while (1) {
      switch (_context3.prev = _context3.next) {
        case 0:
          res.status(200).render('login', {
            title: 'Login into the natours'
          });

        case 1:
        case "end":
          return _context3.stop();
      }
    }
  });
});