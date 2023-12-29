"use strict";

function login(msg) {
  console.log(msg + " Login successfully");
}

login("bhargav");

const das = function (msg) {
  console.log(msg + " Login successfully");
};
const some = das("bhargav");

function add(a, b) {
  return a + b;
}
console.log(add(5, 6));
const sum = function (a, b) {
  return a + b;
};
const s = sum(2, 3);
console.log(s);
