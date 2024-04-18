const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');
const crypto = require('crypto');

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
  role: {
    type: String,
    enum: ['admin', 'lead-guide', 'user', 'guide'],
    default: 'user'
  },
  password: {
    type: String,
    required: [true, 'password must be provide'],
    minlength: 8,
    select: false
  },
  confirmPassword: {
    type: String,
    required: [true, 'password must be provide'],
    minlength: 8,
    validator: function (el) {
      return el === this.password;
    },
    message: 'password not same '
  },
  passwordChangeAt: Date,
  passwordResetToken: String,
  passwordResetTokenExpireIn: Date,
  active: {
    type: Boolean,
    default: true,
    select: false
  },

});

userSchema.methods.createPasswordResetToken = function () {
  const resetToken = crypto.randomBytes(32).toString('hex');
  this.passwordResetToken = crypto
    .createHash('sha256')
    .update(resetToken)
    .digest('hex');
  this.passwordResetTokenExpireIn = Date.now() + 10 * 60 * 1000;
  return resetToken;
};

userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();
  this.password = await bcrypt.hash(this.password, 12);
  this.confirmPassword = undefined;
});

userSchema.pre('save', function (next) {
  if (this.isModified('password') || this.isNew) return next();

  this.passwordChangeAt = Date.now() - 1000;
  next();
});

userSchema.pre(/^find/, function (next) {
  this.find({ active: { $ne: false } });
  next();
});

userSchema.methods.changePasswordAfter = async function (JWTtimestamp) {
  if (this.passwordChangeAt) {
    const changeTimeStamp = parseInt(
      this.passwordChangeAt.getTime() / 1000,
      10
    );
    return JWTtimestamp < changeTimeStamp;
  }
  return false;
};

userSchema.methods.correctPassword = async function (
  candidatePassword,
  userPassword
) {
  return await bcrypt.compare(candidatePassword, userPassword);
};
const User = mongoose.model('User', userSchema);

module.exports = User;
