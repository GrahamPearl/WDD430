// Get dependencies

var mongoose = require('mongoose');
var express = require('express');

var path = require('path');
var http = require('http');

var cookieParser = require('cookie-parser');
var logger = require('morgan');

var index = require('./server/routes/app');

const contactRoutes = require('./server/routes/contacts');
const noticeRoutes = require('./server/routes/notices');
const resourceRoutes = require('./server/routes/resources');
const videoRoutes = require('./server/routes/videos');

mongoose.connect('mongodb://localhost:27017/local-resources',
  { useNewUrlParser: true }, (err, res) => {
    console.log('Attempting connection... ');
    if (err) {
      console.log('Connection failed: ' + err);
    }
    else {
      console.log('Connected to database!');
    }
  }
);

var app = express();

app.use(express.json());
app.use(express.urlencoded({
  extended: false
}));
app.use(cookieParser());

app.use(logger('dev')); // Tell express to use the Morgan logger

// Add support for CORS
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept'
  );
  res.setHeader(
    'Access-Control-Allow-Methods',
    'GET, POST, PATCH, PUT, DELETE, OPTIONS'
  );
  next();
});

// root directory for your web site
// app.use(express.static(path.join(__dirname, 'dist/')));
console.log('Applying routing structure of website... ');
app.use('/', index);
app.use('/contacts', contactRoutes);   console.log('/contacts... ');
app.use('/notices', noticeRoutes);     console.log('/notices... ');
app.use('/resources', resourceRoutes); console.log('/resources... ');
app.use('/videos', videoRoutes);       console.log('/videos... ');

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist/local-resources/index.html'));
});

// Define the port address and tell express to use this port
const port = process.env.PORT || '3000';
app.set('port', port);

const server = http.createServer(app);
server.listen(port, function () {
  console.log('API running on localhost: ' + port)
});
console.log('All processes are acticely listening');