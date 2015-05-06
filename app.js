var express = require('express');
var app = express();
var path = require('path');
var ObjectId = require('mongodb').ObjectID;
var bodyParser = require('body-parser');

//Mongoskin reference at http://www.hacksparrow.com/mongoskin-tutorial-with-examples.html
//remember to install first with npm install mongoskin
var db = require('mongoskin').db('mongodb://owner:menthol1@localhost:27017/website');

//allow parsing of body messages
app.use(bodyParser.json()); // application/json
app.use(bodyParser.urlencoded({extended: true})); // application/x-www-form-urlencoded

app.route('/games/:id?')
    .get(function(req,res){
	if(req.params.id){
	    db.collection('games').findOne(
		{_id: ObjectId(req.params.id)},
		function(err, result){
		    if(err) throw err;
		    res.send(result);
		});
	}
	else{
	    db.collection('games').find().toArray(function(err,result){
		if(err) throw err;
		res.send(result);
	    });
	}
    })
    .post(function(req,res){
	db.collection('games').insert({
	    "name": req.body.name,
	    "description": req.body.description,
	    "image": req.body.image
	},function(err,result){
	    if(err) throw err;
	    res.send(result);
	});
    })
    .delete(function(req,res){
	if(req.params.id){
	    db.collection('games').remove(
		{_id: ObjectId(req.params.id)},
		function(err){
		    if(err) throw err;
		    res.send("Removed");
		});
	}
	else{
	    res.send("No deletion target given");
	}
    })
    .put(function(req,res){
	if(req.params.id){
	    db.collection('games').update(
		{_id: ObjectId(req.params.id)},
		{$set:
		 {"name": req.body.name,
		  "description": req.body.description,
		  "image": req.body.image
		 }
		},
		function(err){
		    if(err) throw err;
		    res.send("Updated");
		}
	    );
	}
	else{
	    res.send("No id specified for updating");
	}
    });

app.use(express.static("public"));
app.use(function(req,res,next){
    res.status(404).send("Sorry, can't find that!");
});

var server = app.listen(80, function(){
    var host = server.address().address;
    var port = server.address().port;

    console.log("App listening at http://%s:%s", host, port);
});
