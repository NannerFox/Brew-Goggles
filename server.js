// module imports
const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');
const morgan = require('morgan');
const db = mongoose.connection;
const app = express();
const axios = require('axios');
const Login = require('./models/Login');
const Time = require('./models/Time');
var moment = require('moment');

// Development mode port
const port = process.env.PORT || 5000;
app.listen(port)

// app middleware
app.use(express.static(path.join(__dirname, 'client/build')));
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(morgan('dev'))

mongoose.connect('mongodb://brewgogglesadmin:alcoholica1@ds117423.mlab.com:17423/brewgoggles', function(err) {
  if (err) {
    console.err(err);
  } else {
    console.log('Connected');
  }
});

db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', () => {
  console.log('DB connected!');
});
mongoose.set('bufferCommands', false);
mongoose.set('debug', true);

// if (moment().add(1, 'hours').isBefore(moment())) 
// 	{
//   };
  
app.get('/test', (req, res) => {
  res.json([
    {id:1, name: "this"},
    {id:2, name: "is"},
    {id:3, name: "a"},
    {id:4, name: "test"}
  ]);
});

app.get('/login', (req, res) => {
  Login.find({}, null, {},function(err, item){
    res.json(item);
  });
})

app.post('/timesync', (req, res) => {
  Time.create({
    ID: 1
  });
  res.end();
})

app.get('/mongotime', (req, res) => {
  Time.find({ ID: 1}, 'DATA -_id', {},function(err, item){
    res.json(item);
  });
})

app.get('/time', (req, res) => {
  res.json(new(Date));
});

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname + '/client/build/index.html'));
});

module.exports = app;