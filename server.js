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
const values = require('./blah/api');
const puller = require('./puller/puller');

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

app.get('/test', (req, res) => {
  res.json([
    {id:1, name: "this"},
    {id:2, name: "is"},
    {id:3, name: "a"},
    {id:4, name: "test"}
  ]);
});

app.get('/time', (req, res) => {
  res.json(puller.timeSync());
});

app.get('/test2', (req, res) => {
  res.json([
    {ID: values.ID, Secret: values.secret}
  ]);
});

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname + '/client/build/index.html'));
});

module.exports = app;
