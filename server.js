var app = require('./app.js');
var fs = require('fs');
var http = require('http');
var https = require('https');

console.log("Current Directory: ", fs.readdirSync('.'));
console.log("Security directory: ", fs.readdirSync('./security'));
var options = {
    key: fs.readFileSync('./security/key.pem'),
    cert: fs.readFileSync('./security/cert.pem')
};

var INSECURE_PORT = 80;
var SECURE_PORT = 443;

http.createServer(app).listen(INSECURE_PORT, function(){
    console.log("Regular http server listening on port " + INSECURE_PORT);
});

https.createServer(options,app).listen(SECURE_PORT, function(){
    console.log("Secure express server listening on port " + SECURE_PORT);
});
