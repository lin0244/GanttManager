'use strict';

// declaration de la constante de bdd
const mongoose=require('mongoose')

//creation du schema
const Schema= mongoose.Schema;

let ChatSchema = new Schema({
    id:{type : Number, required: true, unique:true},
    room:{type:String, required:true,unique:true },
    created:{type:Date,required:true},
    content:{type:String,required:true},
    ressource:{type:String,required:true}
    
});

// creation du modele 
module.exports = mongoose.model('Chat',ChatSchema);
