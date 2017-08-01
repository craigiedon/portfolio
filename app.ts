const express = require('express');
const app = express();
app.use(express.static('public'));
app.use(express.static('node_modules/bootstrap/dist'));

app.get('/', function (req : any, res : any) {
    res.send('Hello World!');
})

app.listen(80, function () {
    console.log("Example app listening on port 8080!");
})
