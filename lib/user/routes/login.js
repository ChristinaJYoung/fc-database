const express = require('express');
const passport = require('passport');
const router = express.Router();

const User = require('../models/login');

require('../local');

router.get('/sign-up', (req, res) => {
  // console.log("req.user", req.user);
  // console.log("req.session", req.session);
  res.sendStatus(200);
});

router.post('/sign-up', (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*')
  console.log(req.body);
  if (req.body.password === req.body.verify) {
    User.findOne({$or: [{email: req.body.email}, {username: req.body.username}]}, (err, user) => {
      console.log('req.body.username', req.body.username);
      if (err) throw err;

      if (user) {

        res.sendStatus(401);
        // console.log('user', user);
      } else {
        User.create(req.body, (err, user) => {
          if (err) throw err;

          res.cookie('username', req.body.username);
          res.sendStatus(200);
        });
      }
    });
  } else {
    res.sendStatus(400);
  }
});

router.get('/login', (req, res) => {
  res.sendStatus(200);
});

router.post('/login', (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*')
  User.findOne({$or: [{email: req.body.email}, {username: req.body.username}]}, (err, user) => {
    console.log('working');
    if (err) throw err;

    if (user) {
      user.authenticate(req.body.password, (err, verified) => {
        console.log('checking things');
        if (err) throw err;

        if (verified) {
          console.log('do we ever get here?');
          req.session.user = user;
          // res.sendStatus(401);
        }
        else {
          console.log('We are here');
        //   res.render('/login', {
        //     email: req.body.email,
        //     message: 'Email password is incorrect'
        //   });
        }
      });
    }
    else {
      console.log('Not Working');
    //   res.render('/login', {
    //       email: req.body.email,
    //       message: 'Email or password is incorrect'
    //   });
    }
  });
});

module.exports = router;
