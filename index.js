// import express
let express = require("express");

// import firewals from model.js
let model = require("./model");

// create a serveur
let server = express();

// use our firewall getText
server.use(model.getText);

// routs of our API

// justify the text
server.post(
  "/api/justify",
  model.verifyTokenValidity,
  model.verifyWordsAndTime
);

// getting the token for authentification
server.post("/api/token", model.getTokenFromApi);

// define port of server
let port = 5000;

// getting start the server
server.listen(port, () => {
  console.log("server start in port "+ port );
});
