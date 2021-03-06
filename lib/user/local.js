'use strict';

const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;

const User = require('./models/login');

const SUCCESSFUL_LOGIN_MSG = 'Success!';
const INCORRECT_USERNAME_MSG = 'Incorrect Username or password';
const INCORRECT_PASSWORD_MSG = 'Incorrect Username or password';

passport.serializeUser(function(user, done) {
  done(null, user._id);
});

passport.deserializeUser(function(id, done) {
  User.findById(id, function(err, user) {
    done(err, user);
  });
});

passport.use(new LocalStrategy ({
    usernameField: 'username',
    emailField: 'email'
  },
  (username, email, password, done) => {
    User.findOne({$or: [{email: email}, {username: username}]}, (err, user) => {
      if (err) throw err;

      if (user) {
        user.authenticate(password, (err, valid) => {
          if (err) throw err;

          if (valid) {
            done(null, user, { message: SUCCESSFUL_LOGIN_MSG });
          } else {
            done(null, null, { message: INCORRECT_PASSWORD_MSG });
          }
        });
      } else {
        done(null, null, { message: INCORRECT_USERNAME_MSG });
      }
    });
  })
);
