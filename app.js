var express = require('express');
var app = express();

var request = require('request');

app.set("view engine", "ejs");



app.get("/",(req,res)=>{
res.render("search");
});

app.get("/results",(req,res)=>{
    var query = req.query.search;

    var url = "http://www.omdbapi.com/?s=" + query + "&apikey=4cce47be";
    request(url,(error,response,body)=>{
        var data = JSON.parse(body);
        if(!error && response.statusCode==200){
            res.render("result",{data: data});
        }
    });
});

app.get("/browse/:movie",(req,res)=>{
    var select = req.params.movie;
    var url = "http://www.omdbapi.com/?i=" + select + "&apikey=4cce47be";
    request(url,(error,response,body)=>{
        var data = JSON.parse(body);
        if(!error && response.statusCode==200){
            res.render("browse",{data: data});
        }
    });
    });

app.listen(3000,()=>{
console.log("Movie App is Running");
});