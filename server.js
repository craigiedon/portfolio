var app = require('/app.js');
var fs = require('fs');
var https = require('https');

var options = {
    key: fs.readFileSync('security/key.pem'),
    cert: fs.readFileSync('security/cert.pem')
};

var PORT = 80;

https.createServer(app).listen(PORT, function(){
    console.log("Secure express server listening on port " + PORT);
});
