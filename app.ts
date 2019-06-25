const express = require('express');
const fs = require('fs');
const app = express();
const md = require('markdown-it')({html: true});

app.use(express.static('public'));
app.use(express.static('node_modules/bootstrap/dist'));

app.get("/content", (req : any , res : any) => {
    fs.readFile('content/index.md', 'utf8', (err : any, markdownData : any)  => { 
        if (err) throw err;
        console.log(markdownData);
        let htmlData = md.render(markdownData);
        res.send(htmlData);
    });

})

app.listen(3000, function () {
    console.log("App listening on port 3000!");
})