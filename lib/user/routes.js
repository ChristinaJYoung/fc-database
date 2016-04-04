// const express = require('express');
// const passport = require('passport');
// const router = express.Router();
//
// const User = require('./models/login');
//
// require('./local');
//
// // console.log('user', user);
//
// // router.get('/login', (req, res) => {
// //   res.sendStatus(200);
// // });
// //
// // router.post('/login',
// //   passport.authenticate('local',
// //     {
// //       successRedirect: '/',
// //       failureRedirect: '/login'
// //     }
// //   )
// // );
// // req.session.user = user;
// //
// // router.delete('/login', (req, res) => {
// //   req.session.regenerate(function(err) {
// //     if (err) throw err;
// //
// //     res.redirect('/');
// //   });
// // });
//
// router.get('/sign-up', (req, res) => {
//   // console.log("req.user", req.user);
//   // console.log("req.session", req.session);
//   res.send(200);
// });
//
// router.post('/sign-up', (req, res) => {
//   // res.setHeader('Access-Control-Allow-Origin', '*')
//   console.log(req.body);
//   if (req.body.password === req.body.verify) {
//     User.findOne({$or: [{email: req.body.email}, {username: req.body.username}]}, (err, user) => {
//       console.log('req.body.username', req.body.username);
//       if (err) throw err;
//
//       if (user) {
//         res.sendStatus(401);
//       } else {
//         User.create(req.body, (err, user) => {
//           if (err) throw err;
//
//           res.sendStatus(200);
//         });
//       }
//     });
//   } else {
//     res.sendStatus(400);
//   }
// });
//
//
//
//
// module.exports = router;
