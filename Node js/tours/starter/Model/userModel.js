const mongoose = require('mongoose');
const validator = require('validator');

const userSchema = mongoose.Schema({
  name: {
    type: String,
    required: [true, 'name is not empty'],
    trim: true,
    maxlength: [40, 'user must have maximum 40 character']
    // minlength: [10, 'user must have minimum 10 character']
  },
  email: {
    type: String,
    required: [true, 'email must be provide'],
    unique: true,
    lowercase: true,
    validate: [validator.isEmail, 'please provide right email']
  },
  photo: {
    type: String
  },
  password: {
    type: String,
    required: [true, 'password must be provide'],
    minlength: 8
  },
  confirmPassword: {
    type: String,
    required: [true, 'password must be provide'],
    minlength: 8,
    validator: function(el) {
      return el === this.password;
    },
    message: 'password not same '
  }
});

userSchema.pre('save',function(next){
  if(!this.isModified('password')) return next();
})

const User = mongoose.model('User', userSchema);

module.exports = User;
