var app = require('./app.js');
var http = require('http');

var PORT = 80;

http.createServer(app).listen(PORT, function(){
    console.log("Express server listening on port: " + PORT);
});
