const router = require('express').Router();
const Cat = require('../models/Category');
const BlogCat = require('../models/BlogCat');

//CREATE CATEGORY
router.post('/', async(req, res)=>{
    const newCat = new Cat(req.body)
    try{
        const savedCat = await newCat.save();
        res.status(200).json(savedCat);
    }catch(err){
        res.status(500).json(err)
    }
})


//GET CATEGORIES
router.get('/', async(req,res)=>{
    try{
       const cats = await Cat.find();
      res.status(200).json(cats);
    }catch(err){
        res.status(500).json(err)
    }
}) 

//CREATE BLOGCATS
router.post('/blog', async(req, res)=>{
    const newBlogCat = new BlogCat(req.body)
    try{
        const savedBlogCat = await newBlogCat.save();
        res.status(200).json(savedBlogCat);
    }catch(err){
        res.status(500).json(err)
    }
})


//GET BLOGCATS
router.get('/blog', async(req,res)=>{
    try{
      const  blogcats = await BlogCat.find();
      res.status(200).json(blogcats);
    }catch(err){
        res.status(500).json(err)
    }
}) 


//DELETE CAT 
router.delete('/:id', async(req,res)=>{
    try{
        await Cat.findByIdAndDelete(req.params.id)
       res.status(200).json('Deleted successfully')
    }catch(err){
        res.status(500).json(err)
    }
})


//DELETE BLOGCAT
router.delete('/blog/:id', async(req,res)=>{
    try{
        await BlogCat.findByIdAndDelete(req.params.id)
       res.status(200).json('Deleted successfully')
    }catch(err){
        res.status(500).json(err)
    }
})

module.exports = router; 