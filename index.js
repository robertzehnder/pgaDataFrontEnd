var express = require("express");
var elasticsearch = require('elasticsearch')
var hbs = require('hbs');
var exphbs  = require('express-handlebars');

var app = express();

var client = elasticsearch.Client({
  host: 'https://elastic:sK6vNw9d5JrvzsVb4zv1v07K@52e10366c0a54c2ae88a2ece0b28cc1b.us-east-1.aws.found.io:9243'
})

var port = process.env.PORT || 3000;
app.listen(port);

app.set("view engine", ".hbs");

// Set extension for view files as .hbs

app.engine('.hbs', exphbs({extname: '.hbs'}));

// Set the path directory for view templates

app.set('views', __dirname + '/public/views');

app.get("/", (req, res) => {
  res.render('index')
})

app.get("/analytics", (req, res) => {
  res.render('dashboard')
})

app.get("/about", (req, res) => {
  res.render('about')
})

app.get("/:name", (req, res) => {
  client.search({
    index: req.params.name,
    type: 'stats',
    body: {
      size: 1000,
      query: {
        match_all: {}
        }
      }
  }).then(function (response) {
    res.json(response);
    // var hits = response.hits.hits
  }, function (error) {
    console.trace(error.message)
  })
});

app.get("/_cat/indices?v")
