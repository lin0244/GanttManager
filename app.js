'use strict';
const http = require('http');
const express = require('express');
const path = require('path');
const favicon = require('serve-favicon');
const logger = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const index = require('./routes/index');
const users = require('./routes/users');
const auth = require('./routes/auth');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const mongoose = require('mongoose');
const app = express();
const server = http.createServer(app);
const io= require('socket.io').listen(server);
const projects = require('./routes/projects')(app,io);
const CronJob = require('cron').CronJob;

const rooms=require('./routes/room');
const socketio= require('./routes/socketio')
// view engine setup
app.set('views', path.join(__dirname, 'views'));

app.set('view engine', 'jade');
app.use(express.static(__dirname + '/room'));
// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(require('less-middleware')(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.resolve(__dirname, 'client')));

app.use(passport.initialize());
app.use(passport.session());

app.use('/', index);
app.use('/users', users);
app.use('/rooms',rooms);
app.use('/login', auth);
app.use('/project', projects);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  let err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});


mongoose.createConnection('mongodb://localhost/ganttmanager', (error) => {
  app.get('/project/:name', function (req, res) { 
    var name = req.params.name;
    res.render('project/' + name);
    })
  }
);

server.listen(process.env.PORT || 3000, process.env.IP || "0.0.0.0", function(){
  let addr = server.address();
  console.log("GanttManager listening at ", addr.address + ":" + addr.port);
});

//Cron pour vider les Tokens du Serveur - Tous les soirs à Minuit

let job = new CronJob('00 00 00 * * *', () => {
    auth.deleteTokens();
  },
  null,
  true, /* Start the job right now */
  'Europe/Paris'
);


module.exports = app;