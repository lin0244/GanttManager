const express  = require('express');
const mongoose = require('mongoose');
const app      = express();
const server   = require('http').Server(app);
const io       = require('socket.io')(server);
let chat  = require('../model/ChatModel');
let roomModel = require('../model/RoomModel');


//Listen for connection
io.on('connection', function(socket) {
  //Globals
  var defaultRoom = 'general';
  var rooms = roomModel.find({},(err,docs)=>{
    if(err){
      console.log(err);
    }
    else{
     rooms=docs;
    }
  });
  console.log(rooms);
  //Emit the rooms array
  socket.emit('setup', {
    rooms: rooms
  });

  //Listens for new user
  socket.on('new user', function(data) {
    data.room = defaultRoom;
    //New user joins the default room
    socket.join(defaultRoom);
    //Tell all those in the room that a new user joined
    io.in(defaultRoom).emit('user joined', data);
  });

  //Listens for switch room
  socket.on('switch room', function(data) {
    //Handles joining and leaving rooms
    //console.log(data);
    socket.leave(data.oldRoom);
    socket.join(data.newRoom);
    io.in(data.oldRoom).emit('user left', data);
    io.in(data.newRoom).emit('user joined', data);

  });

  //Listens for a new chat message
  socket.on('new message', function(data) {
    //Create message
    var newMsg = new chat({
      ressource: data.ressource.name,
      content: data.message,
      room: data.room.toLowerCase(),
      created: new Date()
    });
    //Save it to database
    newMsg.save((err, msg)=>{
      //Send message to those connected in the room
      if(err){
       console.log(err); 
      }
      else
      {
      io.in(msg.room).emit('message created', msg);
      }
        
      });
  });
});
