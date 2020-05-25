var express = require('express');
var fs = require('fs');
var path = require('path');
var app = express();
var md = require('markdown-it')({ html: true });
var hbs = require('hbs');
app.use(express.static('public'));
app.use(express.static('node_modules/bootstrap/dist'));
app.set("view engine", "hbs");
hbs.registerHelper('printAuthors', function (authors) {
    var surnamesFirst = authors.map(function (author) {
        var _a = author.split(" "), firstName = _a[0], lastName = _a[1];
        return lastName + ", " + firstName[0] + ".";
    }).join(", & ");
    return surnamesFirst;
});
app.get("/", function (req, res) {
    fs.readFile('content/publications.json', 'utf8', function (err, data) {
        if (err)
            throw err;
        var pubs = JSON.parse(data);
        res.render("index", { publications: pubs });
    });
});
app.get("/ugly", function (req, res) {
    res.render("ugly", {});
});
app.get("/handle-test", function (req, res) {
    res.render("test", { person: "Craig" });
});
app.get("/blog", function (req, res) {
    fs.readdir('content/blog_posts', function (err, files) {
        if (err)
            throw err;
        var blogPosts = [];
        for (var _i = 0, files_1 = files; _i < files_1.length; _i++) {
            var fName = files_1[_i];
            var parsedFName = path.parse(fName);
            var separatedName = parsedFName.name.split('-');
            var title = separatedName.slice(3).join(' ');
            var fileInfo = {
                title: title,
                date: separatedName.slice(0, 3).join('-'),
                fileName: fName,
                link: parsedFName.name,
                ext: parsedFName.ext
            };
            blogPosts.push(fileInfo);
        }
        res.render("blog", { posts: blogPosts });
    });
});
app.get("/blog/posts/:postName", function (req, res) {
    console.log(req.params["postName"]);
    var postFile = req.params["postName"] + ".md";
    fs.readFile("content/blog_posts/" + postFile, 'utf8', function (err, data) {
        if (err)
            throw err;
        var postContentHTML = md.render(data);
        res.render("post", { title: req.params["postName"], content: postContentHTML });
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