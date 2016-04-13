'use strict';

const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const BCRYPT_DIFFICULTY = 11;

const UserSchema = mongoose.Schema({
  username: String,
  email: String,
  password: String
});

UserSchema.methods.authenticate = function (password, cb) {
  bcrypt.compare(password, this.password, function (err, isMatch) {
    if (err) {
      return cb(err);
    }
      cb(null, isMatch);
  });
};

UserSchema.pre('save', function (next) {
  var user = this;
  if (this.isModified('password') || this.isNew) {
    bcrypt.genSalt(10, function (err, salt) {
      if (err) {
        return next(err);
      }
      bcrypt.hash(user.password, salt, function (err, hash) {
        if (err) {
          return next(err);
        }
        user.password = hash;
        next();
      });
    });
  } else {
      return next();
  }
});

// UserSchema.pre('save', function (next) {
//   bcrypt.hash(this.password, BCRYPT_DIFFICULTY, (err, hash) => {
//     if (err) throw err;
//
//     this.password = hash;
//     return next();
//   });
// });

module.exports = mongoose.model('Users', UserSchema);
