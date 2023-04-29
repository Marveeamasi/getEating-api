const mongoose = require('mongoose');

const ItemSchema = new mongoose.Schema({
    userId:{
        type:String,
        required:true,
    },
    name:{
        type:String,
        max:50,
    },
    desc:{
        type:String,
        max:500,
    },
    img:{
        type:String,
    },
    categories:{
        type:Array,
    }, 
    likes:{
        type:Array,
    },
    dislikes:{
        type:Array,
    },
    quantity:{
        type:Number,
    },
    price:{
        type:Number,
    }, 
    username:{
        type:String,
    }, 
    userLogo:{
        type:String,
        default:"https://www.shutterstock.com/image-photo/bubble-speech-cut-out-phrase-260nw-369907355.jpg",
    }, 
    capacity:{
        type:String,
        default:'unit',
    },
},
{timestamps:true}
);

module.exports = mongoose.model('Item', ItemSchema);