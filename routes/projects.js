'use strict'

const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
const mongoose = require ('mongoose');
const projectModel = require('../model/ProjectModel');


const socket = require('socket.io-client');
let client = socket.connect('https://c9.seefox.fr', {reconnect: true});

client.on('connect', () => {
  console.log('connected')

  client.emit('needHelp');
});

client.on('info',(data)=>{
  console.log(data);
})
 
const serviceName="qwertyuiop";

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
  let toSend={};
  toSend.serviceName=serviceName;
  toSend.projects=[];
  toSend.projects.push(req.body.project);
  req.body.project.serviceName = serviceName;
  projectModel.createProject(req.body.project,(data)=>{
      updateService(toSend);
      res.send(data);
  });
});

router.put('/', function(req, res, next) {
  projectModel.updateProject(req.body.project,(data)=>{
    updateService(req.body.project);
      res.send(data);
  });
});

router.delete('/:id', function(req, res, next) {
  projectModel.deleteProject(req.params.id,(data)=>{
      res.send(data);
  });
});

function deleteService(){
  client.emit('deleteService',serviceName);
}

function updateService(data){
  client.emit('sendUpdate',data);
}

client.on('errorOnProjectUpdate',(data)=>{
  console.log(data);
});

client.on('projectUpdated',(data)=>{
  for(let d in data){
    projectModel.createExternalProject(d,(err,data)=>{
      if(err)
        console.log(err)
    });
  }
});
module.exports = router;