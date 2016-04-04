'use strict';

const express = require('express');
const router = express.Router();

const Breed = require('../models/add-breed');

require('../local');

router.get('/add-breed', (req, res) => {
  // console.log("req.user", req.user);
  // console.log("req.session", req.session);
  res.send(200);
});

router.post('/add-breed', (req, res) => {
  // res.setHeader('Access-Control-Allow-Origin', '*')
  res.sendStatus(200);
  Breed.findOne({}, (err, breed) => {
    console.log(req.body.breedName);
    if (err) throw err;

    if (breed) {
      Breed.create(req.body, (err, breed) => {
        if (err) throw err;

      });
    };

  })
  // if (req.body.password === req.body.verify) {
  //   User.findOne({$or: [{email: req.body.email}, {username: req.body.username}]}, (err, user) => {
  //     console.log('req.body.username', req.body.username);
  //     if (err) throw err;
  //
  //     if (user) {
  //       res.sendStatus(401);
  //     } else {
  //       User.create(req.body, (err, user) => {
  //         if (err) throw err;
  //
  //       });
  //     }
  //   });
  // } else {
  //   res.sendStatus(400);
  // }
});

module.exports = router;
