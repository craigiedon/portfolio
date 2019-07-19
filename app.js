var express = require('express');
var fs = require('fs');
var app = express();
var md = require('markdown-it')({ html: true });
app.use(express.static('public'));
app.use(express.static('node_modules/bootstrap/dist'));
app.get("/front-page-content", function (req, res) {
    fs.readFile('content/index.md', 'utf8', function (err, markdownData) {
        if (err)
            throw err;
        console.log(markdownData);
        var htmlData = md.render(markdownData);
        res.send(htmlData);
    });
});
app.get("/publications", function (req, res) {
    fs.readFile('content/publications.json', 'utf8', function (err, data) {
        if (err)
            throw err;
        res.set("Content-Type", "application/json");
        res.send(data);
    });
});
app.listen(3000, function () {
    console.log("App listening on port 3000!");
});
//# sourceMappingURL=app.js.map