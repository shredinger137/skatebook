var mongo = require("mongodb");
var express = require("express");
var app = express();
var mongourl = "mongodb://localhost:27017";
var MongoClient = require('mongodb').MongoClient, Server = require('mongodb');
var passwordHash = require('password-hash');
var dbConnection = null;
var connectedToDatabase = false;


//this was a helper function during initial database creation; use the same random method to assign future IDs
//to avoid confusion. Deletion should just zero out the fields but keep the id

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
        try {
            const dbCollection = dbConnection.collection("leagues");
            let res = await dbCollection.find(query).skip(page * perPage).limit(perPage).sort(sortQuery).toArray();
            return res;

        } catch (err) {
            return err;
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

exports.checkIfUserExists = async (email) => {
    if (dbConnection) {
        try {
            var account = await dbConnection.collection("users").findOne({ email: email });
        } catch (err) {
            console.log(err);
        }
        if (account) {
            return false;
        }
        else {
            return true;
        }
    }
}

exports.getNewId = async () => {
    var id = Math.random().toString(36).slice(2);
    if (dbConnection) {
        try {
            var account = await dbConnection.collection("users").findOne({ trexaId: id });
        } catch (err) {
            console.log(err);
            return false;
        }
        if (account) {
            getNewId();
        } else {
            try {
                var challenge = await dbConnection.collection("challenges").findOne({ challengeId: id });
            } catch (err) {
                console.log(err);
                return false;
            }
            if (challenge) {
                getNewId();
            } else {
                return id;
            }
        }
    }
}


exports.createUserAccount = async (username, password, emailAddress, id, res) => {
    var passwordHashed = passwordHash.generate(password);

    var userData = {
        internalId: id,
        username: username,
        email: emailAddress,
        password: passwordHashed
    }

    if (dbConnection) {
        dbConnection.collection("users").insertOne(userData, function (err, result) {
            if (err) throw err;
            return true;
        }
        )
    }
}