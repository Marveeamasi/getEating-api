const mongoose = require('mongoose');

const BlogCatSchema = new mongoose.Schema(
{ 
    name:{
        type:String, 
        required:true,
  }, 
  img:{
    type:String,   
},  
} 
);

module.exports = mongoose.model('BlogCat', BlogCatSchema);  