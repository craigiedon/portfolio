var express = require('express');
var http = require('http');
var https = require('https');
var app = express();
var multer = require('multer');
var fs = require('fs');

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

passport.serializeUser(function(user, done){
    done(null, user.username);
});

passport.deserializeUser(function(name, done){
    done(null, {username: name});
});

passport.use(new LocalStrategy(
    function(username, password, done){
	db.collection('users').findOne(
	    {username: username},
	    function(err, result){
		if(err){
		    return done(err);
		}
		if(result && result.password === password){
		    return done(null, {"username": username});
		}
		
		return done(null, false);
	    });
    }
));

app.use(session({secret: 'I like turtles',
		 resave: true,
		 saveUninitialized: true}
	       ));
app.use(passport.initialize());
app.use(passport.session());

app.use(multer({dest: './public/gameFiles',
		rename: function(fieldname, filename){
		    return filename;
		}
	       })
       );

function isLoggedIn(req, res, next) {
    console.log("Session information", req.session);
    console.log("Are you authenticated?", req.isAuthenticated());
    if(req.isAuthenticated()){
	return next();
    }

    res.status(403).end();
}

app.post('/api/authenticate', passport.authenticate('local'),
	 function(req,res){
	     res.send(req.user);
	 });

app.get('/api/games/:id?', function(req,res){
    if(req.params.id){
	var id;
	try{
	    id = ObjectId(req.params.id);
	}
	catch(err){
	    return res.send("Invalid Object Id");
	}
	db.collection('games').findOne(
	    {_id: id},
	    function(err, result){
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

app.post('/api/games',
	 isLoggedIn,
	 function(req,res){
	     db.collection('games').insert(req.body, function(err,result){
		 if(err) throw err;
		 res.send(result);
	     });
	 });

app.delete('/api/games/:id', isLoggedIn, function(req,res){
    var id;
    try{
	id = ObjectId(req.params.id);
    }
    catch(err){
	return res.send("Invalid Object Id");
    }
    db.collection('games').remove(
	{_id: id},
	function(err){
	    if(err) throw err;
	    res.send("Removed");
	});
});

app.put('/api/games/id', isLoggedIn, function(req,res){
    var id;
    try{
	id = ObjectId(req.params.id);
    }
    catch(err){
	return res.send("Invalid Object Id");
    }
    db.collection('games').update(
	{_id: id},
	{$set:
	 {"name": req.body.name,
	  "description": req.body.description
	 }
	},
	function(err){
	    if(err) throw err;
	    res.send("Updated");
	}
    );
});

app.get('/admin', function(req,res){
    res.redirect('/admin.html');
});

app.use(express.static("public"));
app.use(function(req,res,next){
    res.status(404).send("Sorry, can't find that!");
});

module.exports = app;
