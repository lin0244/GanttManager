'use strict'

const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
const crypto = require('crypto');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;

const mongoose = require ('mongoose');
const userModel = require('../model/UserModel');

let tokens = {};

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
      
      if(tokens[username] == null) {
        let token = crypto.randomBytes(16).toString('hex');
        
        tokens[username] = token;
      }

      return done(null, user);
    });
  });
}));


router.post('/', passport.authenticate('local', {
  failureRedirect : '/loginFailed'
}), (req,res) => {
  res.json(tokens[req.user.username]);
});

router.post('/disconnect', (req,res) => {
  let username = req.body.username;
  
  delete tokens[username];
});


router.get('/register', (req, res, next) => {
  var user = new userModel();

  user.username = req.body.username;
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