//Predefined Library
const http = require('http');

//Our Custom Files
const app=require('./app')

const port =  process.env.PORT || 4000;

const server=http.createServer(app);

server.listen(port);

console.log("Started 👂 On Port 4000")