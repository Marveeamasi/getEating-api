const mongoose = require('mongoose');

const BlogSchema = new mongoose.Schema({
  
    title:{
        type:String, 
    },
    desc:{
        type:String,
    },
    img:{ 
        type:String,
    }, 
    categories:{
        type:Array,
    }, 
   video:{
        type:String,
    }, 
    sourceLogo:{ 
        type:String,
        default:"https://www.shutterstock.com/image-photo/bubble-speech-cut-out-phrase-260nw-369907355.jpg",
    }, 
    sourceData:{
        type:String,
        default:"getEating"
    },
},
{timestamps:true}
);

module.exports = mongoose.model('Blog', BlogSchema);