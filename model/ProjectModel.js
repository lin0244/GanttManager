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
    start: Date,
    end: Date
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


let exp = ()=>{};

exp.createProject = (pro, callback) => {
  projectSchema.insert(pro, (err, data) => {
    if (err)
      console.log(err);
    else
      callback(data);
  });
}

exp.getAllProjects = (callback) => {
  projectSchema.find((err, data) => {
    if (err)
      console.log(err);
    else
      callback(data);
  });
};

exp.getAllProjectsName = (callback) => {
  projectSchema.find({}, {
    _id: true,
    name: true
  }, (err, data) => {
    if (err)
      console.log(err);
    else
      callback(data);
  });
}

exp.getAllMyProjects = (n, callback) => {
  projectSchema.find({
    resources: [{
      name: n
    }]
  }, (err, data) => {
    if (err)
      console.log(err);
    else
      callback(data);
  });
}

exp.getProjectById = (id, callback) => {
  projectSchema.findById(id, (err, data) => {
    if (err)
      console.log(err);
    else
      callback(data);
  });
}

exp.updateProject = (pro, callback) => {
  projectSchema.update( { _id: pro._id  }, pro, { upsert: true }, (err, data) => {
    if (err)
      console.log(err);
    else
      callback(data);
  });
}

exp.deleteProject = (i,callback) => {
  projectSchema.delete({
    _id: i
  }, (err, data) => {
    if (err)
      console.log(err);
    else
      callback(data);
  });
}

module.exports = exp;
