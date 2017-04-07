'use strict'

const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
const mongoose = require ('mongoose');
const projectModel = require('../model/ProjectModel');

/* GET projects listing. */
router.get('/', function(req, res, next) {
    res.render('project/index', { title: 'Express' });
});

router.get('/all', function(req, res, next) {
  projectModel.getAllProjectsName((data)=>{
      res.send(data);
  });
});

router.get('/:id', function(req, res, next) {
  projectModel.getProjectById(req.params.id,(data)=>{
      res.send(data);
  });
});

router.post('/', function(req, res, next) {
  projectModel.createProject(req.body.project,(data)=>{
      res.send(data);
  });
});

router.put('/', function(req, res, next) {
  projectModel.updateProject(req.body.project,(data)=>{
      res.send(data);
  });
});

router.delete('/:id', function(req, res, next) {
  projectModel.deleteProject(req.params.id,(data)=>{
      res.send(data);
  });
});

function synWS(io, data){
  io.emit('sendUpdate', data);
}

module.exports = router;