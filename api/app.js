const dbFunctions = require('./db');
var express = require("express");
var app = express();
var config = require("./config.js");

dbFunctions.dbInit();

app.get("/leagues", function (req, res) {

    res.header("Access-Control-Allow-Origin", "*");
    res.setHeader("Content-Type", "text/plain");

    var query = {};
    var sortQuery = {};

    if (req && req.query) {
        if (req.query.searchQuery) {
            //create query
        }

        //set other params
        console.log(req.query);
        var perPage = (req.query.perPage ? +req.query.perPage : 50);
        var page = (req.query.page ? +req.query.page : 0);
        var sort = (req.query.sort ? req.query.sort : "leagueName");
        var sortValue = (req.query.sortValue ? req.query.sortValue : 1);

    }

    sortQuery[sort] = +sortValue;

    dbFunctions.getLeaguesByQuery(query, perPage, page, sortQuery).then(result => {
        if (result) {
            dbFunctions.getLeaguesTotalByQuery(query).then(count => {
                var data = [result, count];
                res.send(data);
            })
               


        } else {
            res.send("error");
        }
    })

});



app.listen(config.port);
