const router = require('express').Router();
const Post = require('../models/Safebuy');




//UPDATE SAFEBUY
router.put('/:id/buy', async(req,res)=>{
  try{
      const postt = await Post.findById(req.params.id);
      if(postt.buyerId === req.body.userId){
         await postt.updateOne({$set: req.body},{new:true});
      res.status(200).json(postt)
  }else{
     res.status(403).json('you can update only your safebuy');
  }
  }catch(err){ 
     res.status(500).json(err);
  }
  });

  //UPDATE SAFESELL
router.put('/:id/sell', async(req,res)=>{
  try{
      const pos = await Post.findById(req.params.id);
      if(pos.sellerId === req.body.userId){
         await pos.updateOne({$set: req.body},{new:true});
      res.status(200).json(pos)
  }else{
     res.status(403).json('you can update only your safebuy');
  }
  }catch(err){ 
     res.status(500).json(err);
  }
  });

 //UPDATE BUY
 router.put('/:id', async(req,res)=>{
  try{
      const buy = await Post.findById(req.params.id);
         await buy.updateOne({$set: req.body},{new:true});
      res.status(200).json(buy)
  }catch(err){
     res.status(500).json(err);
  }
  });

//CREATE SAFEBUY
router.post('/', async(req, res)=>{
    const newPost = new Post(req.body)
    try{
        const savedPost = await newPost.save();
        res.status(200).json(savedPost);
    }catch(err){  
        res.status(500).json(err)
    }
})

//GET SAFEBUY
router.get('/:id',async (req, res)=>{
    try{
        const post = await Post.findById(req.params.id);
        res.status(200).json(post);
    }catch(err){
        res.status(500).json(err)
    }
})


//GET SAFEBUYS
router.get('/', async(req,res)=>{
    const productId = req.query.itemId;
    const buyerId = req.query.buyer;
    const sellerId = req.query.seller;
    try{
        let posts;
      if(productId){
        posts = await Post.find({_id:productId})
      }else if(buyerId){
        posts = await Post.find({buyerId});
      }else if(sellerId){
        posts = await Post.find({sellerId});
      }else{
        posts = await Post.find();
      }
      res.status(200).json(posts);
    }catch(err){
        res.status(500).json(err)
    }
})



module.exports = router;