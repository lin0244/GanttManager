'use strict';

const mongoose = require('mongoose');

//
const projectSchema = mongoose.model('Projects', {
  nameService: String,
  name: String,
  desc: String,
  daysOff: {
    Mo: Boolean,
    Tu: Boolean,
    We: Boolean,
    Th: Boolean,
    Fr: Boolean,
    Sa: Boolean,
    Su: Boolean
  },

  workingHours: {
    start: Number,
    end: Number
  },

  task: [{
    id: Number,
    name: String,
    desc: String,
    percentageProgress: Number,
    linkedTask: Array,
    ressources: Array,
    start : Number,
    end : Number,
    color: String
  }],

  groupTask: [{
    name: String,
    start: Number,
    end: Number
  }],

  resources: [{
    name: String,
    cost: Number,
    typeR: String
  }],

  milestones: [{
    name: String,
    date: Number
  }]

});


let exp = () => {};

exp.createProject = (pro, callback) => {
  let tmp = new projectSchema(pro);
    console.log("youhou");
  tmp.save((err, data) => {
    console.log("youhou");
    if (err){
      console.log("error");
      console.log(err);
    }
    else{
      console.log("yo");
      callback(data);
    }
  });
}

exp.createExternalProject = (pro, callback) => {
  for (let p in pro.projects) {
    p.nameService = pro.nameService;
    let ps = new projectSchema(p);
    ps.save((err, data) => {
      if (err)
        console.log(err);
      else
        callback(data);
    });
  }
}

exp.getAllProjects = (callback) => {
  projectSchema.find((err, data) => {
    if (err)
      console.log(err);
    else
      callback(data);
  });
};

exp.getAllProjectsByService = (service, callback) => {
  projectSchema.find({
    nameService: service
  }, {
    nameService: false
  }, (err, data) => {
    if (err)
      console.log(err);
    else
      callback(err,data);
  });
};

exp.getAllProjectsName = (callback) => {
  console.log('allpname');
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
  projectSchema.update({
    _id: pro._id
  }, pro, {
    upsert: true
  }, (err, data) => {
    if (err)
      console.log(err);
    else
      callback(data);
  });
}

exp.deleteProject = (i, callback) => {
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
