const express = require('express');
const passport = require('passport');
const router = express.Router();

const User = require('./model');

require('./local');

router.get('/login', (req, res) => {
  res.sendStatus(200);
});

router.post('/login',
  passport.authenticate('local',
    {
      successRedirect: '/',
      failureRedirect: '/login'
    }
  )
);
// req.session.user = user;

router.delete('/login', (req, res) => {
  req.session.regenerate(function(err) {
    if (err) throw err;

    res.redirect('/');
  });
});

router.get('/tab/sign-up', (req, res) => {
  res.sendStatus(200);
});

router.post('/tab/sign-up', (req, res) => {
  // res.setHeader('Access-Control-Allow-Origin', '*')
  console.log(req.body);
  res.send("Hello, Steve");
  // if (req.body.password === req.body.verify) {
  //   User.findOne({$or: [{email: req.body.email}, {username: req.body.username}]}, (err, user) => {
  //     if (err) throw err;
  //
  //     if (user) {
  //       res.sendStatus(401);
  //     } else {
  //       User.create(req.body, (err) => {
  //         if (err) throw err;
  //
  //         res.sendStatus(200);
  //       });
  //     }
  //   });
  // } else {
  //   res.sendStatus(400);
  // }
});

module.exports = router;
