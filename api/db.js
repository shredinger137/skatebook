var mongo = require("mongodb");
var express = require("express");
var app = express();
var mongourl = "mongodb://localhost:27017";
var MongoClient = require('mongodb').MongoClient, Server = require('mongodb').Server;

var dbConnection = null;
var connectedToDatabase = false;

exports.dbInit = () => {
    MongoClient.connect('mongodb://localhost:27017/', { useUnifiedTopology: true, useNewUrlParser: true }, function (err, client) {
        if (err) { console.error(err) }
        dbConnection = client.db('skatebook')
        connectedToDatabase = true;
        console.log("Connected to Database");
    })

}

exports.getLeaguesByQuery = async (query, perPage, page) => {
    console.log("started getLeaguesByQuery");

    if(!perPage){
        var perPage = 200;
    }
    if(!page){
        var page = 0;
    }

    if (dbConnection) {
        console.log("getting leagues from db");
        return await dbConnection.collection("leagues").find(query).skip(page * perPage).limit(perPage).toArray();
    } else return ("not connected");

}

