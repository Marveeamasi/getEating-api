const mongoose = require('mongoose');

const ChatSchema = new mongoose.Schema({
  
    userId:{
        type:String, 
    },
    text:{
        type:String,
    },
    img:{ 
        type:String,
    }, 
    audio:{ 
        type:String,
    }, 
    username:{
        type:String,
    },
    userLocation:{
        type:String,
    },
    userPics:{
        type:String,
    },
    productId:{
        type:String,
    },
},
{timestamps:true}
);

module.exports = mongoose.model('Chat', ChatSchema);