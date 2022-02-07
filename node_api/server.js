var express = require('express');
var app = express();
var mongodb = require('mongodb');
var MongoClient = mongodb.MongoClient;

// Add responses to requests 
app.get('/api/v1/randomquote', function(req, res) {
    let url = "mongodb://mongodb:27017/";
    MongoClient.connect(url, async function(err, db) {
        if (err) throw err;
        let dbo = db.db("typinglite");

        let num_quotes = await dbo.collection("quotes").countDocuments();
        let rnd = Math.floor(Math.random() * num_quotes);
        console.log("Count: " + num_quotes + ", rnd: " + rnd);
        dbo.collection("quotes").find().limit(1).skip(rnd).toArray((err, result) => {
            if (err) throw err;
            console.log(result);
            res.end(result[0].text);
            db.close();
        });
    });
});

app.get('/api/v1/test', function(req, res) {
    res.end("Seems to work fine.");
});

// Create the server to listen to them 
let server = app.listen(8080);
