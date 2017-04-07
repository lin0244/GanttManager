'use strict'

const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
const auth = require('../routes/auth');
const mongoose = require ('mongoose');
const userModel = require('../model/UserModel');

router.get('/:username', (req,res) => {
    userModel.findOne({name: req.params.username}, function (err,docs) {
       if(err) {
           console.log(err);
       } else {
           res.json(docs);
       }
    });
});


router.get('/', (req,res) => {
    userModel.find({},function (err,docs) {
       if(err) {
           console.log(err);
       } else {
           res.status(200);
           res.json(docs);
       }
    });
});


router.post('/addUser', (req,res) => {
    console.log(req.body);
    let user = new userModel({
          username : req.body.username,
          email : req.body.email
    });
    
    user.setPassword(req.body.password);
    
    console.log(user);
    
    user.save(function (err) {
       if(err) {
           console.log(err);
       } else {
           res.status(200);
           console.log('Insert de :' + user);
       }
    });
});


router.post('/deleteUser', (req,res) => {
    let usernameUser = req.body.params;
    
    let heroDelete = userModel.findOne({username : usernameUser});
    
    heroDelete.remove((err) => {
       if(err) {
           console.log(err);
       } else {
           res.status(200);
           console.log('Delete de :' + usernameUser);
       }
    });
});


router.post('/updateUser', (req,res) => {
    userModel.findOneAndUpdate({id : req.body.params.id}, req.body.params ,(err) => {
       if(err) {
           console.log(err);
       } else {
           res.status(200);
           console.log('Update de :' + req.body.params.id);
       }});
});
module.exports = router;