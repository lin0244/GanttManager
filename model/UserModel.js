'use strict';

const mongoose = require('mongoose')
const Schema = mongoose.Schema;

let UserSchema = new Schema ( {
  id : {type : Number, required: true, unique:true},
  name : {type: String, required: true, unique: true, trim: true},
  role : {type: String, required: true},
  age : {type: Number}
});

module.exports = mongoose.model('User', UserSchema);
