const express = require('express');
require("../src/db/conn");
const Goodies = require("../src/models/items")
const app = express();
const port = process.env.PORT || 8000;
app.use(express.json());

// CORS
const cors = require('cors');
app.use(cors({
    origin: 'http://localhost:3000'
}));
// we will handle a post request 

// DELETE
app.delete("/items/:id", async(req, res)=>{
    try{
        const getItems = await Goodies.findByIdAndDelete(req.params.id);
        res.send(getItems);
    }catch(e){
        res.status(500).send(e);
    }
})

// POST

app.post("/itemsPost", async(req, res)=>{
    try{
        const addingTime = new Date();
        // console.log(req);
         const adding = new Goodies(
             {
                 "name":req.body.name,
                 "date":addingTime
             }
         )
        console.log(req.body);
        const insertItems = await adding.save();
        res.status(201).send(insertItems);
    }catch(e){
        res.status(400).send(e);
    }
})

// PATCH
// app.patch("/mensPatch/:id", async(req, res)=>{
//     try{
//         const _id = req.params.id;
//         const getMens = await MensRanking.findByIdAndUpdate(_id,req.body, {
//             new:true
//         }); 
//         res.send(getMens);
//     }catch(e){
//         res.status(400).send(e);
//     }
// })

// we will handle get req of indiv
app.get("/items", async(req,res) =>{
    try{
        const getItems = await Goodies.find({});
        res.send(getItems);
    }catch(e){
        res.status(400).send(e);
    }
})

app.get("/", async(req,res) =>{
    res.send("Hello")
} )

app.listen(port, () => {
    console.log(`connection is live at port no. ${port}`);
}) 
