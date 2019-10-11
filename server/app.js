const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const path = require('path');
const index = require('./routes/index');
const api = require('./routes/api');

const CORS = (req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  next();
};

app.use(CORS);
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended : false}) );
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', index);
app.use('/api', api);

module.exports = app;
