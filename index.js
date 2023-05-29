const express = require('express');
const app = express();
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const helmet = require('helmet');
const morgan = require('morgan');
const authRoute = require('./routes/auth');
const usersRoute = require('./routes/users');
const safebuysRoute = require('./routes/safebuys');
const itemsRoute = require('./routes/items');
const blogsRoute = require('./routes/blogs');
const categoriesRoute = require('./routes/categories');
const chatsRoute = require('./routes/chats');
const gamechatsRoute = require('./routes/gamechats');
const Post = require('./models/Item');

const port = process.env.PORT || 5000;

// add this below app.use("/", routes) to make index.html a static file
app.route('/show')
  .get(function (req, res) {
    res.sendFile(process.cwd() + '/index.html');
});

app.get('/details', async (req, res) => {
    const post = await Post.find();
    res.send(post);
});


//use .env
dotenv.config();
//connect to database
mongoose.set('strictQuery', false);
mongoose.connect(process.env.MONGO_URL,  {
        useNewUrlParser: true,
        useUnifiedTopology: true
    }
) 
.then(()=>
 console.log('mongo connected')
 )
 .catch((err)=>{
    console.log(err)
});
 //middle ware
app.use(express.json());
app.use(express.urlencoded({
    extended: true
}));
app.use(helmet());
app.use(morgan('common'));
app.use('/api/auth', authRoute);
app.use('/api/users', usersRoute);
app.use('/api/items', itemsRoute);
app.use('/api/blogs', blogsRoute);
app.use('/api/safebuys', safebuysRoute);
app.use('/api/categories', categoriesRoute);
app.use('/api/chats', chatsRoute);
app.use('/api/gamechats', gamechatsRoute);
//run server
app.listen(port, ()=>{
 console.log('Backend server running!');
});  
