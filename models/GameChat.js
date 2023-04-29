const mongoose = require('mongoose');

const GameChatSchema = new mongoose.Schema({
  
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
},
{timestamps:true}
);

module.exports = mongoose.model('GameChat', GameChatSchema);