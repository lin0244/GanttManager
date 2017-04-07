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
