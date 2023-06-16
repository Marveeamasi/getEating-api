const router = require('express').Router();
const Post = require('../models/GameChat');
const Info = require('../models/Timer');

//CREATE CHAT
router.post('/', async(req, res)=>{
    const newPost = new Post(req.body)
    try{
        const savedPost = await newPost.save();
        res.status(200).json(savedPost);
    }catch(err){  
        res.status(500).json(err)
    }
})

//UPDATE CHAT
router.put('/:id', async(req,res)=>{
    try{
        const post = await Post.findById(req.params.id);
           await post.updateOne({$set: req.body},{new:true});
        res.status(200).json(post)
    }catch(err){
        res.status(500).json(err)
    }
    });
    

//UPDATE CHATS
router.put('/:id/many', async(req,res)=>{
try{
    const posts = await Post.updateMany({userId: req.params.id},{
        $set:req.body,
    },{new:true})
    res.status(200).json(posts)
}catch(err){
    res.status(500).json(err)
}
});


//DELETE CHAT
router.delete('/:id/game', async(req,res)=>{
    try{
        const post = await Post.findById(req.params.id);
        if(post.userId === req.body.userId){
           await post.deleteOne();
        res.status(200).json('successfully removed item')
    }else{
       res.status(403).json('you can delete only your item');
    }
    }catch(err){
       res.status(500).json(err);
    }
    });
    
 
//GET CHAT
router.get('/:id/game',async (req, res)=>{
    try{
        const post = await Post.findById(req.params.id);
        res.status(200).json(post);
    }catch(err){
        res.status(500).json(err)
    }
})


//GET CHATS
router.get('/', async(req,res)=>{
    const productId = req.query.item;
    try{
        let posts;
      if(productId){
        posts = await Post.find({productId})
      }else{
        posts = await Post.find();
      }
      res.status(200).json(posts); 
    }catch(err){
        res.status(500).json(err)  
    }
})


//GET INFOS
router.get('/timer', async(req,res)=>{
    try{
      const infos = await Info.find();
      res.status(200).json(infos);
    }catch(err){
        res.status(500).json(err)
    }
})

//GET INFO
router.get('/timer/:id',async (req, res)=>{
    try{
        const info = await Info.findById(req.params.id);
        res.status(200).json(info);
    }catch(err){
        res.status(500).json(err)
    }
})
 
//DELETE INFO
router.delete('/timer/:id', async(req,res)=>{
    try{
        const info = await Info.findById(req.params.id);
           await info.deleteOne();
        res.status(200).json('successfully removed game info')
    }catch(err){
       res.status(500).json(err);
    }
    });
    
 //CREATE INFO
router.post('/timer', async(req, res)=>{
    const newPost = new Info(req.body)
    try{
        const savedPost = await newPost.save();
        res.status(200).json(savedPost);
    }catch(err){  
        res.status(500).json(err)
    }
})



module.exports = router;
