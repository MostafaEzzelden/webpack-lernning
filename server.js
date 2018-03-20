const path = require('path');
const http = require('http');
const express = require('express');
const favicon = require('serve-favicon');

const port = process.env.PORT || 3000;
const publicPath = path.join(__dirname, 'dist');

var app = express();

app.use(express.static(publicPath));

app.use(favicon(path.join(__dirname,'favicon.ico')));

var server = http.createServer(app);
server.listen(port, () => {
  console.log(`Server is up on port: ${port}`);
});
