'use strict'

const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const roomModel = require('../model/RoomModel');
const chatModel = require('../model/ChatModel');
const path = require('path');

router.use(express.static(path.resolve(__dirname, 'views')));



/* GET ROOMS  */




router.get('/', (req, res) => {
  roomModel.find({}, (err, docs) => {
    if (err) {
      console.log(err);
    }
    else {
      res.render('index', { title: 'Room' });
      console.log('raph ok');
    }
  });
});

router.get('/all', (req, res) => {
  roomModel.find({}, (err, docs) => {
    if (err) {
      console.log(err);
    }
    else {
      res.json(docs);
      console.log('raph ok');
    }
  });
});



/*// New room 
router.post('/', (req, res, next) => {
  let room = new roomModel();
  roomModel.save((err, room) => {
    if (err) {
      console.log(err);
    }
    else {
      console.log(room);
      res.json(room);
    }

  });

});*/


router.post('/', (id,name,next) => {
  let room = new roomModel();
  room.save((err, room) => {
    if (err) {
      console.log(err);
    }
    else {
      console.log(room);
    }

  });

});




// methode 
router.post('/add', (req, res, next) => {
  let chatSaved = req.body.chatModel;
  chatModel.save((err, chatSaved) => {
    if (err) {
      console.log(err);
    }
    else {
      console.log(chatSaved);
      res.json(chatSaved);
    }
  });

});


router.get('/setup',(req,res,next)=>{
  
  let roomData = [{
      id: 1,
      projetName: 'projectx',
  
    }, {
      id: 2,
      projetName: 'raphael',

    },

    {
      id: 3,
      projetName: 'testProjet',

    }

  ];

  for (var r = 0; r < roomData.length; r++) {
    console.log(r);
    //Create an instance of the chat model
    let newRoom = new roomModel(roomData[r]);
    //Call save to insert the chat
    newRoom.save((err) => {
      if (err) {
        console.log(err);
      }

    });
  }

    console.log('initialization ok');
  res.json(roomData);
  
  
  
});









router.get('/msgs', (req, res, next) => {
  chatModel.find({
    'room': req.query.room.name.toLowerCase()
  }).exec((err, msgs) => {
    if (err) {
      console.log(err);
    }
    else {

      res.json(msgs);
    }
    //Send

  });

});





router.get('/setupmsgs', (req, res, next) => {
  //Array of chat data. Each object properties must match the schema object properties
  console.log('raph dans la methode setup');

  let chatData = [{
    id: 1,
    created: new Date(),
    content: 'Hi',
    ressource: 'Chris',
    room: 'raph'
  }, 
  {
    id: 3,
    created: new Date(),
    content: 'Hello',
    ressource: 'Obinna',
    room: 'laravel'
  },
  {
    id: 4,
    created: new Date(),
    content: 'Ait',
    ressource: 'Bill',
    room: 'angular'
  }, {
    id: 5,
    created: new Date(),
    content: 'Amazing room',
    ressource: 'Patience',
    room: 'socket.io'
  }];



  //Loop through each of the chat data and insert into the database
  for (var c = 0; c < chatData.length; c++) {
    console.log(c);
    //Create an instance of the chat model
    let newChat = new chatModel(chatData[c]);
    //Call save to insert the chat
    newChat.save((err) => {
      if (err) {
        console.log(err);
      }
    });
    
  
  }
  console.log('initialization ok');
  res.json(chatData);

});


// room by name 
router.get('/:name', (req, res, next) => {
  roomModel.find({
    name: req.params.name
  }, (err, docs) => {
    if (err) {
      console.log(err);
    }
    else

    {

      res.json(docs);
    }
  });
});




// deletting a room
router.delete('/:name', (req, res, next) => {
  let room = req.body.room;
  roomModel.findOne({
    name: room.name
  }, (err, docs) => {
    if (err) {
      console.log(err);
    }
    else

    {
      roomModel.delete(room, (err, docs) => {
        if (err) {
          console.log(err);
        }
        else {
          res.send(200);

        }
      });
    }
  });

});



module.exports = router;
