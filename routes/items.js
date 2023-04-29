const router = require('express').Router();
const Post = require('../models/Item');

//CREATE ITEM
router.post('/', async(req, res)=>{
    const newPost = new Post(req.body)
    try{
        const savedPost = await newPost.save();
        res.status(200).json(savedPost);
    }catch(err){  
        res.status(500).json(err)
    }
})

//UPDATE ITEM 
router.put('/:id', async(req,res)=>{
try{ 
    const post = await Post.findById(req.params.id);
    if(post.userId === req.body.userId){
       await post.updateOne({$set: req.body},{new:true});
    res.status(200).json('successfully updated item')
}else{
   res.status(403).json('you can update only your item');
}
}catch(err){
   res.status(500).json(err);
}
});

//UPDATE ITEMS
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


//DELETE ITEM
router.delete('/:id', async(req,res)=>{
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
    
 
 
//LIKE ITEM
router.put('/:id/approve', async(req,res)=>{
    try{
        const post = await Post.findById(req.params.id);
        if(!post.likes.includes(req.body.userId)){
            await post.updateOne({$push: {likes: req.body.userId}});
            res.status(200).json('this post has been approved')
        }else{
            await post.updateOne({$pull: {likes: req.body.userId}});
            res.status(200).json('approval removed from item')
        } 
    }catch(err){
        res.status(500).json(err)
    } 
})

//DISLIKE ITEM
router.put('/:id/disapprove', async(req,res)=>{
    try{
        const post = await Post.findById(req.params.id);
        if(!post.dislikes.includes(req.body.userId)){
            await post.updateOne({$push: {dislikes: req.body.userId}});
            res.status(200).json('this post has been disapproved')
        }else{
            await post.updateOne({$pull: {dislikes: req.body.userId}});
            res.status(200).json('disapproval removed from item')
        }
    }catch(err){
        res.status(500).json(err)
    }
})

//GET ITEM
router.get('/:id',async (req, res)=>{
    try{
        const post = await Post.findById(req.params.id);
        res.status(200).json(post);
    }catch(err){
        res.status(500).json(err)
    }
})
 

//GET ITEMS
router.get('/', async(req,res)=>{
    const username = req.query.user;
    const catName = req.query.cat;
    const name = req.query.name;
    try{
        let posts;
      if(username){
        posts = await Post.find({username})
      }else if(name){
        posts = await Post.find({name})
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