'use strict';

const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/ganttmanager', (error) => {
  if (error) {
    console.log(error);
  }
})

let projectSchema = mongoose.model('Projects', {
  name: String,
  desc: String,
  daysOff: {
    M: Boolean,
    T: Boolean,
    W: Boolean,
    T: Boolean,
    F: Boolean,
    S: Boolean,
    S: Boolean
  },

  workingHours: {
    start: Time,
    end: Time
  },

  task: [{
    id: Number,
    name: String,
    desc: String,
    percentageProgress: Number,
    linkedTask: Array,
    ressources: Array
  }],

  groupTask: [{
    name: String,
    start: Date,
    end: Date
  }],

  resources: [{
    name: String,
    cost: Number,
    type: String
  }],

  milestones: [{
    name: String,
    date: Date
  }]

});



module.exports = () => {
  function getAllProjects(callback) {
    projectSchema.find((err, data) => {
      if (err)
        console.log(err);
      else
        callback(data);
    });
  }

  function getAllMyProjects(n, callback) {
    projectSchema.find({resources:[{name : n}]}, (err, data) => {
      if (err)
        console.log(err);
      else  
        callback(data);
    });
  }
  
  function getByID(id, callback){
    projectSchema.findById(id,(err,data)=>{
      if (err)
        console.log(err);
      else  
        callback(data);
    });
  }
  
  function deleteProject(i, callback){
    projectSchema.delete({_id:i},(err,data)=>{
      if (err)
        console.log(err);
      else  
        callback(data);
    });
  }
  
  function updateProject(pro, callback){
    projectSchema.update({_id:pro._id}, pro, {upsert : true}, (err,data)=>{
      if (err)
        console.log(err);
      else  
        callback(data);
    });
  }
}
