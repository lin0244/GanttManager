'use strict'

const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');

const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;

const mongoose = require ('mongoose');
const userModel = require('../model/UserModel');

/* GET users listing. */

passport.serializeUser(function(user, done) {
  done(null, user);
});

passport.deserializeUser(function(user, done) {
  done(null, user);
});

passport.use(new LocalStrategy(function(username, password, done) {
  process.nextTick(function() {
    userModel.findOne({'username': username, }, function(err, user) {
      if (err) {
        console.log('Error');
        return done(err);
      }

      if (!user) {
        console.log('User not Found');
        return done(null, false);
      }

      if (!user.validPassword(password)) {
        console.log('Password is wrong');
        return done(null, false);
      }

      return done(null, user);
    });
  });
}));


router.post('/', passport.authenticate('local', {
    successRedirect: '/',
    failureRedirect: '/'
  })
);

router.get('/loginFailure', function(req, res, next) {
  res.send('Failed to authenticate');
});

router.get('/loginSuccess', function(req, res, next) {
  res.send('Successfully authenticated');
});

router.get('/register', function(req, res, next) {
  var user = new userModel();

  user.username = req.body.name;
  user.email = req.body.email;

  user.setPassword(req.body.password);
  
  user.save(function (err) {
     if(err) {
         console.log(err);
     } else {
         res.status(200);
         console.log('Insert de :' + user);
     }
  });
});

module.exports = router;