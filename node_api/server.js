var express = require('express');
var app = express();

app.get('/api/v1/a', function(req, res) {
    res.end("This is the a API");
});

app.get('api/v1/b', function(req, res) {
    res.end("This is the b API");
})