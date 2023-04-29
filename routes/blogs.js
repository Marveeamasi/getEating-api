const router = require('express').Router();
const Post = require('../models/Blog');

//CREATE BLOG
router.post('/', async(req, res)=>{
    const newPost = new Post(req.body)
    try{
        const savedPost = await newPost.save();
        res.status(200).json(savedPost);
    }catch(err){  
        res.status(500).json(err)
    }
})

//UPDATE BLOG 
router.put('/:id', async(req,res)=>{
try{ 
    const post = await Post.findById(req.params.id);
       await post.updateOne({$set: req.body},{new:true});
    res.status(200).json('successfully updated item')
}catch(err){
   res.status(500).json(err);
}
});



//DELETE BLOG
router.delete('/:id', async(req,res)=>{
    try{
        const post = await Post.findById(req.params.id);
           await post.deleteOne();
        res.status(200).json('successfully removed blog')
    }catch(err){
       res.status(500).json(err);
    }
    });
    
 
 



//GET A BLOG
router.get('/:id',async (req, res)=>{
    try{
        const post = await Post.findById(req.params.id);
        res.status(200).json(post);
    }catch(err){
        res.status(500).json(err)
    }
})


//GET BLOG
router.get('/', async(req,res)=>{
    const username = req.query.user;
    const catName = req.query.cat;
    try{
        let posts;
      if(username){
        posts = await Post.find({username})
      }else if(catName){
        posts = await Post.find({
            categories:{ 
                $in: [catName],
            },
        });
      }else{
        posts = await Post.find();
      }
      res.status(200).json(posts);
    }catch(err){
        res.status(500).json(err)
    }
})




module.exports = router;