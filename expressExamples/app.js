var express = require('express');
var path = require('path');
var ObjectId = require('mongodb').ObjectID;
var bodyParser = require('body-parser');

var app = express();

//Mongoskin reference at http://www.hacksparrow.com/mongoskin-tutorial-with-examples.html
//remember to install first with npm install mongoskin
var db = require('mongoskin').db('mongodb://owner:menthol1@localhost:27017/website');

//allow parsing of body messages
app.use(bodyParser.json()); // application/json
app.use(bodyParser.urlencoded({extended: true})); // application/x-www-form-urlencoded

//Functions for the database...
app.route('/bands/:id?')
    .get(function(req,res){
	if(req.params.id){
	    db.collection('bands').findOne({_id: ObjectId(req.params.id)}, function(err, result){
		if(err) throw err;
		res.send(result);
	    });
	}
	else{
	    db.collection('bands').find().toArray(function(err,result){
		if(err) throw err;
		res.send(result);
	    });
	}					 
    })
    .post(function(req,res){
	console.log(req.body);
	db.collection('bands').insert({
	    "name": req.body.name,
	    "coolness": req.body.coolness
	}, function(err, result){
	    if (err) throw err;
	    if(result) console.log("Added");
	    res.send(result);
	});
    })
    .delete(function(req,res){
	if(req.params.id){
	    db.collection('bands').remove({_id: ObjectId(req.params.id)}, function(err, result){
		if(err) throw err;
		res.send("Removed");
	    });
	}
	else{
	    res.send("No deletion target given");
	}
    });

app.get('/', function(req, res){
    res.send('Hello World!');
});

//accept POST request on the homepage
app.post('/', function(req, res){
    res.send('Got a POST request');
});

//accept PUT request at /user
app.put('/user', function(req,res){
    res.send('Got a PUT request at /user');
});

//accept DELETE request at /user
app.delete('/user', function(req, res){
    res.send('Got a DELETE request at /user');
});

//accept any GET request which matches the pattern
app.get('/ab+cd', function(req,res){
    res.send('ab+cd');
});

//accept GET and respond with a json object
app.get('/json', function(req, res){
    res.json({name: "Craig"});
});

//an example of chained routes for more compact code
app.route('/book')
    .get(function(req,res){
	res.send('Get a book');
    })
    .post(function(req,res){
	res.send('Add a book');
    })
    .put(function(req,res){
	res.send('Update the book');
    });

//express sees this folder as a "static" folder, which it can freely serve assets from
app.use('/fun', express.static('public'));

var server = app.listen(3000, function(){
    var host = server.address().address;
    var port = server.address().port;

    console.log('Example app listening at http://%s:%s', host, port);
});

//In express, a 404 is simply the absence of work. No other routes or middleware responded:
//NOTE: this needs to go at the bottom to be effective
app.use(function(req, res, next){
    res.status(404).send('Sorry cant find that!');
});
