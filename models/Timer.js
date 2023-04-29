const mongoose = require("mongoose");

const TimerSchema = new mongoose.Schema({
info:{
    type:String,
},
},{timestamps:true})

module.exports = mongoose.model('Timer',TimerSchema);