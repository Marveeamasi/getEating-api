const mongoose = require('mongoose');

const SafebuySchema = new mongoose.Schema({
    buyerId:{
        type:String,
    },
    sellerId:{ 
        type:String, 
    },
    usernameOfBuyer:{
        type:String,
    },
    usernameOfSeller:{
        type:String,
    },
    screenshot:{
        type:String,
    }, 
    buyerLocation:{
        type:String,
    },
    quantity:{
        type:Number,
    },
    capacity:{
        type:String,
    }, 
    price:{
        type:Number,
    }, 
    sellerAccount:{
        type:String,
    },
    sellerPhone:{
        type:Number,
    },  
    buyerPhone:{
        type:Number,
    },
    buyerPhone:{
        type:Number,
    },
    buycomfirmed:{
        type:Boolean,
        default:false,
    },
    sellcomfirmed:{
        type:Boolean,
        default:false,
    },
    productId:{
        type:String,
        
    },
    productName:{
        type:String,
        
    },
    verified:{
        type:Boolean,
        default:false,
    },
},
{timestamps:true}
);

module.exports = mongoose.model('Safebuy', SafebuySchema);