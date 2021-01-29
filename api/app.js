const dbFunctions = require('./db');
var express = require("express");
var app = express();
app.use(express.json());
var config = require("./config.js");

function IsJsonString(str) {
    try {
        JSON.parse(str);
    } catch (e) {
        return false;
    }
    return true;
}

dbFunctions.dbInit();

app.use(function (req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET, PUT, POST, DELETE, OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, Content-Length, X-Requested-With');

    if ('OPTIONS' === req.method) {
        res.send(200);
    }
    else {
        next();
    }
});


//Endpoint '/leagues' can use get, post, delete or update, with the meaning of each being clear. Get can either be no URL parameters, meaning you get all, or 
//include an ID number to get a specific league's data. 

//The 'update' option requires a league ID, and a token to ensure the user has permission to do an update. 
//If we have future functions - like events or whatever - the update may need an action.

//Sending a 'post' creates a new league, assuming the user has permission to do that. 

//Delete is pretty self explanatory.

app.get('/leagues/:id?', (req, res) => {


    if (req.params.id) {
        //get single league data
        var leagueId = req.params.id;

        var query = { leagueId: +leagueId };
        var sortQuery = {
            leagueName: 1
        }

        dbFunctions.getLeaguesByQuery(query, 50, 0, sortQuery).then(result => {
            res.send(result);
        })

    } else {
        var query = {};
        var sortQuery = {};
        var data = {
            results: {},
            count: 0,
            errors: false
        };

        if (req && req.query) {
            if (req.query.searchQuery) {
                if (IsJsonString(req.query.searchQuery)) {
                    query = JSON.parse(req.query.searchQuery);
                } else {
                    data["errors"] = ["Invald JSON"];
                }
            }

            //set other params
            var perPage = (req.query.perPage ? +req.query.perPage : 50);
            var page = (req.query.page ? +req.query.page : 0);
            var sort = (req.query.sort ? req.query.sort : "leagueName");
            var sortValue = (req.query.sortValue ? req.query.sortValue : 1);

        }

        sortQuery[sort] = +sortValue;

        dbFunctions.getLeaguesByQuery(query, perPage, page, sortQuery).then(result => {
            if (result) {
                dbFunctions.getLeaguesTotalByQuery(query).then(count => {
                    data["results"] = result;
                    data["count"] = count;
                    res.send(data);
                })

            } else {
                res.send("error");
            }
        })
    }
})

app.delete('/leagues/:id', function (req, res) {
    res.send('Got a DELETE request')
})

app.post('/leagues', function (req, res) {
    res.send('Got a POST request')
})

app.patch('/leagues', function (req, res) {
    res.send('Got a PATCH request');
//use this for updates

})




app.listen(config.port);
