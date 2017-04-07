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


UserSchema.methods.setPassword = function(password){
  this.salt = crypto.randomBytes(16).toString('hex');
  this.password = crypto.pbkdf2Sync(password, this.salt, 1000, 64).toString('hex');
};

UserSchema.methods.validPassword = function(password) {
  var hash = crypto.pbkdf2Sync(password, this.salt, 1000, 64).toString('hex');
  console.log(hash);
  return this.password === hash;
};

module.exports = mongoose.model('User', UserSchema);
