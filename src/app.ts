const express = require('express');
const fs = require('fs');
const path = require('path');
const app = express();
const md = require('markdown-it')({html: true});
const hbs = require('hbs');
const yaml = require('js-yaml');

app.use(express.static('public'));
app.use(express.static('node_modules/bootstrap/dist'));

app.set("view engine", "hbs")

hbs.registerHelper('printAuthors', (authors : Array<String>) => {
  let surnamesFirst = authors.map((author) => {
    let [firstName, lastName] = author.split(" ");
    return `${lastName}, ${firstName[0]}.`;
  }).join(", & ");
  return surnamesFirst;
});

app.get("/", (req : any , res : any) => {
    fs.readFile('content/publications.yaml', 'utf8', (err : any, data : any)  => { 
        if (err) throw err;
        let pubs = yaml.load(data);
        res.render("index", {publications: pubs})
    });
});

app.get("/ugly", (req : any , res : any) => {
    res.render("ugly", {});
});

app.get("/bounce", (req: any, res: any) => {
    res.render("bounce", {});
});

app.get("/handle-test", (req: any, res: any) => {
    res.render("test", {person: "Craig"});
});

app.get("/helloyaml", (req: any, res: any) => {
    const doc = yaml.load(fs.readFileSync('content/publications.yaml', 'utf8'))
    console.log(doc);
    res.set("Content-Type", "application/json");
    res.send(doc);
});

app.get("/blog", (req: any, res: any) => {
    fs.readdir('content/blog_posts', (err : any, files : any)  => { 
        if (err) throw err;

        let blogPosts : Array<any> = []
        for(let fName of files){
            let parsedFName = path.parse(fName);
            let separatedName : Array<String> = parsedFName.name.split('-');
            let title : String = separatedName.slice(3).join(' ');
            let fileInfo = {
                title: title,
                date: separatedName.slice(0,3).join('-'),
                fileName: fName,
                link: parsedFName.name,
                ext: parsedFName.ext
            };
            blogPosts.push(fileInfo);
        }

        res.render("blog", {posts: blogPosts})
    });
})

app.get("/blog/posts/:postName", (req: any, res: any) => {
    console.log(req.params["postName"])
    let postFile = `${req.params["postName"]}.md`
    fs.readFile(`content/blog_posts/${postFile}`, 'utf8', (err : any, data : any)  => { 
        if (err) throw err;
        let postContentHTML = md.render(data);
        res.render("post", {title: req.params["postName"], content: postContentHTML})
    });
})


app.get("/publications", (req : any , res : any) => {
    fs.readFile('content/publications.json', 'utf8', (err : any, data : any)  => { 
        if (err) throw err;
        res.set("Content-Type", "application/json");
        res.send(data);
    });

})


app.listen(3000, function () {
    console.log("App listening on port 3000!");
})
