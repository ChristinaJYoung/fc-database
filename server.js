'user strict'

const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const methodOverride = require('method-override');
const mongoose = require('mongoose');
const passport = require('passport');
const session = require('express-session');
const connectRedis = require('connect-redis');

const userRoutes = require('./lib/user/routes/login');
const breeds = require('./lib/user/routes/add-breed');
const RedisStore = connectRedis(session);

const PORT = process.env.PORT || 3000;
const SESSION_SECRET = process.env.SESSION_SECRET || 'secret';

app.set('view engine', 'jade');

app.use(bodyParser.json());
app.use(methodOverride('_method'));
app.use(session({
  cookieName: 'session',
  duration: 24 * 60 * 60 * 1000,
  secret: SESSION_SECRET,
  store: new RedisStore({})
}));
app.use(function (req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:8100');
  // Request methods you wish to allow
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

 // Request headers you wish to allow
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

 // Set to true if you need the website to include cookies in the requests sent
 // to the API (e.g. in case you use sessions)
  res.setHeader('Access-Control-Allow-Credentials', true);

 // Pass to next layer of middleware
  next();
});
app.use(passport.initialize());
app.use(passport.session());

app.locals = '';

app.use(userRoutes);
app.use(breeds);

mongoose.connect('mongodb://localhost:27017/finalProject', (err) => {
  if (err) throw err;

  app.listen(PORT, () => {
    console.log(`App listening on port ${PORT}`);
  });
});
