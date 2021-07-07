// const path = require('path');
const express = require('express');
const app = express();
const cors = require('cors');
const bodyParser = require("body-parser");
const logger = require("morgan");

app.use(cors())

// app.use(express.urlencoded({extented: false}));

// const staticPath = (path.join(__dirname))

var arr = ["item 1" , "item 2", "item3"];
arr.push("item 4", "item 5")
app.get("/",(req,res) => {
    res.send(arr);
});

// app.get("/about",(req,res) => {
//     res.send("hello world from about");
// });

app.post('/new', (req,res) => {
    const post = req.body;
    console.log(post);
    post.push(post);
    res.send('Done');
});

app.listen(8000, () => {
    console.log("listening the port at 8000");
});