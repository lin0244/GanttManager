/**
 * Created by Elessar 06/04/2017 
 * 
 * UserModel - Schéma Utilisateur pour l'utilisation de mongoose.
 * - Username : Nom d'utilisateur (Unique)
 * - Password : Mot de passe crypté. (Hash)
 * - Email : Email de l'utilisateur (Unique)
 * - Salt : Salt générer lors de la création de l'utilisateur.
 */
'use strict';
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const crypto = require('crypto');

let UserSchema = new Schema ( {
  username : {type: String, required: true, unique: true, trim: true},
  password : {type: String, required: true, unique: false, trim: true},
  email : {type: String, required: true, unique: true, trim: true},
  salt : String
});

//Méthode pour créer le Hash et Salt du Mot de passe.
UserSchema.methods.setPassword = function(password){
  this.salt = crypto.randomBytes(16).toString('hex');
  this.password = crypto.pbkdf2Sync(password, this.salt, 1000, 64).toString('hex');
};

//Méthode pour vérifier si le Mot de passe envoyé est bien identique à celui de l'utilisateur.
UserSchema.methods.validPassword = function(password) {
  var hash = crypto.pbkdf2Sync(password, this.salt, 1000, 64).toString('hex');
  return this.password === hash;
};

module.exports = mongoose.model('User', UserSchema);
