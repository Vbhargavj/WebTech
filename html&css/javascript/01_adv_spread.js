"use strict";

const vbj = ["vbj", "bhargav", "adh", "a", "sd", "af", "sd"];

const [a, , b, ...some] = vbj;

const newarray = ["his", "f", ...vbj];
console.log(newarray);
console.log(a, b, some)

console.log(...some)

const vc = null||"bhargav"

const asd=vbj[8]||0||5
const x=vbj.numGuest?vbj.numGuest:10
console.log(x);
console.log(asd);
console.log(vc);
