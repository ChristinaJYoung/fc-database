'use strict';

const mongoose = require('mongoose');

module.exports = mongoose.model('breeds',
	mongoose.Schema({
  			breedName: String,
	})
);
