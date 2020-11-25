// import express
let express = require("express");

// import bodyParser
let bodyParser=require('body-parser')

// import firewals from model.js
let model = require("./model");

// create a serveur
let server = express();

server.use(bodyParser.urlencoded({extended:false}))
server.use(bodyParser.json())

// getting the token for authentification
server.post("/api/token", model.getTokenFromApi);

// use our firewall getText
server.use(model.getText);

// routs of our API

// justify the text
server.post(
  "/api/justify",
  model.verifyTokenValidity,
  model.verifyWordsAndTime
);


// define port of server
let port = process.env.PORT  || 5000;

// getting start the server
server.listen(port, () => {
  console.log("server start in port "+ port );
});
