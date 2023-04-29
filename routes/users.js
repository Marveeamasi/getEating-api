const router = require('express').Router();
const User = require('../models/User');
const Post = require('../models/Item');
const bcrypt = require('bcrypt');
const { response } = require('express');

//UPDATE USER
router.put('/:id', async(req,res)=>{
    if(req.body.userId === req.params.id || req.body.isAdmin){
      if(req.body.password){
        try{
            const salt = await bcrypt.genSalt(10);
            req.body.password = await bcrypt.hash(req.body.password, salt);
        }catch(err){
          return  res.status(500).json(err);
        }
    }
try{
    const user = await User.findByIdAndUpdate(req.params.id, {
        $set: req.body,
    },{new:true}); 
    res.status(200).json(user)
}catch(err){
   return res.status(500).json(err) 
}
    }else{
        return res.status(403).json('you can update only your account');
    }
});

//UPDATE USERS
router.put('/many', async(req,res)=>{
    try{
        const users = await User.updateMany({
            $set:req.body,
        },{new:true})
        res.status(200).json(users)
    }catch(err){
        res.status(500).json(err)
    }
    });
    

//DELETE USER
router.delete('/:id', async(req,res)=>{
    if(req.body.userId === req.params.id || req.body.isAdmin){
try{
   const user =  await User.findById(req.params.id); 
     try{
        await Post.deleteMany({username: user.username})
        await User.findByIdAndDelete(req.params.id);
    res.status(200).json("account has been removed");
}catch(err){
    res.status(500).json(err) 
}
}catch(err){
   res.status(404).json('User not found!')
}
    }else{
        return res.status(403).json('you can delete only your account');
    }
});



//GET A USER
router.get('/:id', async(req,res)=>{
try{
    const user = await User.findById(req.params.id);
    res.status(200).json(user);
}catch(err){
    res.status(500).json(err);
    console.log(err)
}
});


//GET ALL USERS
router.get('/', async(req,res)=>{
    const gameParticipant = req.query.isPlaying;
    const validForGame = req.query.validPlayer;
    const wonGame = req.query.isWinner;
    try{
        let users;
      if(gameParticipant){
        users = await User.find({gameParticipant})
      }else if(validForGame){
        users = await User.find({validForGame})
      }else if(wonGame){
        users = await User.find({wonGame});
      }else{
        users = await User.find();
      }
      res.status(200).json(users);
    }catch(err){
        res.status(500).json(err)
    }
})



module.exports = router; 