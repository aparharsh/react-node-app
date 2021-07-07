const path = require('path');
const express = require('express');
const app = express();

app.use(express.urlencoded({extented: false}));

arr = ["item 1" , "item 2", "item3"];
app.get("/",(req,res) => {
    res.send(arr);
});

app.get("/about",(req,res) => {
    res.send("hello world from about");
});

app.post('/', (req,res) => {
    console.log(req.body);
    res.send('created user');
});

app.listen(3000, () => {
    console.log("listening the port at 3000");
});