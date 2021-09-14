const mongoose = require("mongoose");
const itemSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true,
        trim:true,
    },
    date:{
        type:Date,
        reuired:true,
        trim:true
    },     
})
// we are creating a new collection 
const Goodies = new mongoose.model("Goodies", itemSchema)
module.exports = Goodies;