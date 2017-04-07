'use strict';

// declaration de la constante de bdd
const mongoose=require('mongoose')

//creation du schema
const Schema= mongoose.Schema;

let roomSchema = new Schema({
    id:{type : Number, required: true, unique:true},
    projetName:{type:String, required:true,unique:true }
});

// creation du modele 
module.exports = mongoose.model('Room',roomSchema);


