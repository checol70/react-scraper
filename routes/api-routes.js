var axios = require("axios");
var config = require("../config")
var db = require("../models")
var key = process.env.key || config.key;


module.exports = function (app){
    app.get("/nyt/articles/:query/:begin/:end", function(req,res){
        url = `https://api.nytimes.com/svc/search/v2/articlesearch.json?api-key=${key}&q=${req.params.query}&begin_date=${req.params.begin}&end_date=${req.params.end}&fl=snippet,pub_date,headline,web_url`
        axios.get(url).then(result=>{
            res.send(result.data.response);
        })
    })
    
    app.get("/nyt/articles/:query/:begin", function(req,res){
        url = `https://api.nytimes.com/svc/search/v2/articlesearch.json?api-key=${key}&q=${req.params.query}&begin_date=${req.params.begin}&fl=snippet,pub_date,headline,web_url`
        axios.get(url).then(result=>{
            res.send(result.data.response);
        })
    })

    app.get("/nyt/articles/:query", function(req,res){
        url = `https://api.nytimes.com/svc/search/v2/articlesearch.json?api-key=${key}&q=${req.params.query}&fl=snippet,pub_date,headline,web_url`
        axios.get(url).then(result=>{
            res.send(result.data.response);
        })
    })

    app.get("/api/articles", function(req,res){
        db.Article.find({})
            .then(response=>{
                res.send(response);
            })
            .catch(err=>{
                console.log(err);
            })
    })

    app.post("/api/articles", function(req,res){
        db.Article.create(req.body)
        .then((response)=>{
            res.end();
        }).catch(err=>{
            console.log(err);
        })
    })

    app.delete("/api/articles", function(req,res){
        console.log("body",req.body)
        db.Article.findAndRemove({web_url: req.body.web_url})
        .then((response)=>{
            res.end();
        }).catch(err=>{
            console.log(err);
        })
    })
}