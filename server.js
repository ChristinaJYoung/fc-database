'user strict'

const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const methodOverride = require('method-override');
const mongoose = require('mongoose');
const passport = require('passport');
const session = require('express-session');
const RedisStore = require('connect-redis')(session);

const userRoutes = require('./lib/user/routes');

const PORT = process.env.PORT || 3000;
const SESSION_SECRET = process.env.SESSION_SECRET || 'secret';

app.set('view engine', 'jade');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(methodOverride('_method'));
app.use(session({
  secret: SESSION_SECRET,
  store: new RedisStore()
}));
app.use(passport.initialize());
app.use(passport.session());

app.locals = '';

mongoose.connect('mongodb://localhost:27017/nodeauth', (err) => {
  if (err) throw err;

  app.listen(PORT, () => {
    console.log(`App listening on port ${PORT}`);
  });
});
