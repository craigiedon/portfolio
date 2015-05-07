var express = require('express');
var app = express();
var path = require('path');
var ObjectId = require('mongodb').ObjectID;
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var session = require('express-session');
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;

//Mongoskin reference at http://www.hacksparrow.com/mongoskin-tutorial-with-examples.html
//remember to install first with npm install mongoskin
var db = require('mongoskin').db('mongodb://owner:menthol1@localhost:27017/website');

//allow parsing of body messages
app.use(bodyParser.json()); // application/json
app.use(cookieParser());
app.use(bodyParser.urlencoded({extended: true})); // application/x-www-form-urlencoded
app.use(session({secret: 'I like turtles',
		 resave: true,
		 saveUninitialized: true}
	       ));
app.use(passport.initialize());
app.use(passport.session());

passport.serializeUser(function(user, done){
    done(null, user.username);
});

passport.deserializeUser(function(username, done){
    db.collection('users').findOne(
	{username: username},
	function(err, user){
	    done(err, user);
	});
});

passport.use(new LocalStrategy(
    function(username, password, done){
	if(username === 'admin' && password === 'lynda'){
	    return done(null, {username: 'admin'});
	}

	return done(null, false);
    }
));

function isLoggedIn(req, res, next) {
    console.log(req.isAuthenticated());
    next();
}

app.post('/authenticate', passport.authenticate('local'),
	 function(req,res){
	     res.send("Authenticated successfully");
	 });

app.get('/games/:id?', function(req,res){
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
});

app.post('/games', isLoggedIn,
	 function(req,res){
	     console.log("You made it into the post");
	     db.collection('games').insert({
		 "name": req.body.name,
		 "description": req.body.description,
		 "image": req.body.image
	     },function(err,result){
		 if(err) throw err;
		 res.send(result);
	     });
	 });

app.delete('/games/:id', function(req,res){
    db.collection('games').remove(
	{_id: ObjectId(req.params.id)},
	function(err){
	    if(err) throw err;
	    res.send("Removed");
	});
});

app.put('/games/id', function(req,res){
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
