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

exports.getLeaguesByQuery = async (query, perPage, page, sortQuery) => {

    if (dbConnection) {

        try {
            const dbCollection = dbConnection.collection("leagues");
            let res = await dbCollection.find(query).skip(page * perPage).limit(perPage).sort(sortQuery).toArray();
            return res;

        } catch (err) {
            return err;
        }

    }
}

exports.getLeaguesTotalByQuery = async (query) => {

    if (dbConnection) {

        try {
            const dbCollection = dbConnection.collection("leagues");
            let res = await dbCollection.find(query).count();
            return res;

        } catch (err) {
            return err;
        }

    }
}