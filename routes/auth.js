/**
 * Created by Elessar 06/04/2017 
 * 
 * Auth - Controller des Authentification côté Serveur
 */
'use strict'
const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
const crypto = require('crypto');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;

const mongoose = require ('mongoose');
const userModel = require('../model/UserModel');

//Tokens : Liste des Token fournis par le serveurs aux utilsateurs.
let tokens = {};

passport.serializeUser(function(user, done) {
  done(null, user);
});

passport.deserializeUser(function(user, done) {
  done(null, user);
});

//Stratégie d'Authentification pour PassPort.
passport.use(new LocalStrategy(function(username, password, done) {
  process.nextTick(function() {
    console.log(username);
    userModel.findOne({'username': username}, function(err, user) {
      if (err) {
        console.log('Error');
        return done(err);
      }

      if (!user) {
        console.log('User not Found');
        return done(null, false);
      }

      //Si le mot de passe de l'utilisateur ne correspond pas, on retourne false.
      if (!user.validPassword(password)) {
        console.log('Password is wrong');
        return done(null, false);
      }
      
      //Tout est Ok à ce point là. On vérifie si la personne n'est pas déjà Authentifiée. Si elle est, on ne crée pas de nouveau Token.
      if(tokens[username] == null) {
        let token = crypto.randomBytes(16).toString('hex');
        
        tokens[username] = token;
        
        console.log("New Auth Accepted");
      } else {
        console.log("Already Auth");
      }

      return done(null, user);
    });
  });
}));

//On récupère la requête Post d'Authentification. Si l'authentification est bonne, on retourne le Token côté client. On stock ensuite ce token dans les Cookies de l'utilisateur.
router.post('/auth', passport.authenticate('local'), (req, res, next) => {
    res.json(tokens[req.user.username]);
});

//On récupère la requête Post de déconnexion. On supprime le Token de l'utilisateur qui se déconnecte.
router.post('/disconnect', (req,res) => {
  let username = req.body.username;
  
  delete tokens[username];
});

//On récupère la requête Post d'enregistrement. On crée un utilisateur avec le Username, Mot de passe et Email.
router.post('/register', (req, res, next) => {
  var user = new userModel();

  user.username = req.body.params.username;
  user.email = req.body.params.email;

  user.setPassword(req.body.params.password);
  
  user.save(function (err) {
     if(err) {
         console.log(err);
     } else {
         res.status(200);
         console.log('Insert de :' + user);
     }
  });
});


router.deleteTokens = () => {
  tokens = {};
}

module.exports = router;