const dbFunctions = require('./db');
var express = require("express");
var app = express();
var config = require("./config.js");

dbFunctions.dbInit();

app.get("/leagues", function (req, res) {

    res.header("Access-Control-Allow-Origin", "*");
    res.setHeader("Content-Type", "text/plain");

    console.log("get leagues");

    var query = {};

    if (req && req.query && req.query.searchQuery) { 
        //create query
     }

    
        dbFunctions.getLeaguesByQuery(query).then(result => {
            if (result) {
                res.send(result);
            } else {
                res.send("error");
            }
        })
  
});



app.listen(config.port);