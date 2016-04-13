'use strict';

const express = require('express');
const router = express.Router();

const Breed = require('../models/add-breed');

require('../local');

router.get('/add-breed', (req, res) => {
  Breed.findOne({}, (err) => {
    if (err) throw err;

    console.log('breed name', mongoose.breedName);
  })
  res.send(200);
});

router.post('/add-breed', (req, res) => {
  // res.setHeader('Access-Control-Allow-Origin', '*')
  res.sendStatus(200);
  // if (breedName === req.body.breedName) {
  //   Breed.findOne({}, (err, breed) => {
  //     console.log(req.body.breedName);
  //     if (err) throw err;
  //       res.send('Breed Already Exists');
  //     });
  //   }
  //   else {

      Breed.create(req.body, (err, breed) => {
        if (err) throw err;
      });
});

module.exports = router;
