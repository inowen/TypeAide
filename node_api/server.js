var express = require('express');
var app = express();
var mongodb = require('mongodb');
var MongoClient = mongodb.MongoClient;

// Add responses to requests 
app.get('/api/v1/randomquote', function(req, res) {
    let url = "mongodb://localhost:27017/";
    MongoClient.connect(url, function(err, db) {
        if (err) throw err;
        let dbo = db.db("typinglite");
        dbo.collection("quotes").findOne({}, (err, result) => {
            if (err) throw err;
            console.log(result.text);
            res.end(result.text);
            db.close();
        });
    });
});

app.get('/api/v1/test', function(req, res) {
    res.end("Seems to work fine.");
});

// Create the server to listen to them 
let server = app.listen(8080);
