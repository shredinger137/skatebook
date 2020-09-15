var mongo = require("mongodb");
var express = require("express");
var app = express();
var mongourl = "mongodb://localhost:27017";
var MongoClient = require('mongodb').MongoClient, Server = require('mongodb');

var dbConnection = null;
var connectedToDatabase = false;


//this was a helper function during initial database creation; use the same random method to assign future IDs
//to avoid confusion, deletion should just zero out the fields but keep the id

async function createLeagueId() {
    if (dbConnection) {
        try {
            const dbCollection = dbConnection.collection("leagues");
            var res = await dbCollection.find({}).toArray();
        } catch (err) {
            return err;
        }
        if (res) {
            for (league of res) {
                try {
                    const dbCollection = dbConnection.collection("leagues");
                    var search = await dbCollection.find({ leagueId: league.leagueId }).toArray();
                } catch (err) {
                    return err;
                }
                if (search && search.length > 1) {
                    var random = Math.floor(Math.random() * 90000) + 10000;
                    if (true) {
                        console.log("Writing id");
                        const dbCollection = dbConnection.collection("leagues");
                        dbCollection.updateOne({ _id: league._id }, { $set: { leagueId: random } });
                    }
                }
            }
        }
    }




}

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