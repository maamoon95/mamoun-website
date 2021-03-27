const express = require('express');
const exphbs = require('express-handlebars');
const session = require('express-session');
const cookieParser = require('cookie-parser');
const flash = require('connect-flash');
const morgan = require('morgan');
const methodOverride = require('method-override');
const bodyParser = require('body-parser');
const { Sequelize } = require('sequelize');
const path = require('path');

const app = express();
const { sequelize, User, Post, Like } = require('./models')
const PORT = process.env.PORT || 3000;
 //register view engine
 app.set('views', './view');
 app.set('view engine', 'ejs');
// Database connection controller
require('./controllers/dbconnect');
// syncing tables
require('./controllers/tablesync');
 //starting server localhost
app.listen(PORT, console.log('server started on port ',PORT));

//using cookies and flash alert system
app.use(cookieParser());
app.use(session({ cookie: { maxAge: 60000 }, 
    secret: 'woot',
    resave: false, 
    saveUninitialized: false}));
app.use(flash());
/////// using express and method override for http requests
app.use(express.json());
app.use(methodOverride('_method'));
////////////////////////////////////////////////



// List all users
app.get('/users', async (req, res) => {
    const id = req.params.id
    try {
      const user = await User.findAll()
      return res.status(200).json(user)
    } catch (err) {
      console.log(err)
      return res.status(500).json({ error: 'Something went wrong' })
    }
})
//// create user
app.post('/users', async (req, res) => {
    const { name , password , email } = req.body

    const id = req.params.id
    try {
        const user = await User.create({ name, password, email } )
        return res.json(user)

    }   catch (err) {
        console.log(err)
        return res.status(500).json(err)
      }
  })
/////
//// create Post
app.post('/post', async (req, res) => {
    const { userid, body } = req.body;

    try {
        const user = await Post.create({ userid, body } )
        return res.json(user)

    }   catch (err) {
        console.log(err)
        return res.status(500).json(err)
      }
})
  
//post Like create action
app.post('/post/like', async (req, res) => {
    const { userid, postid } = req.body;

    try {
        const likecheck = await Like.findOne({ where: { userid, postid } })
        console.log(likecheck);
        if (likecheck === null) {
          
                const like = await Like.create({ userid, postid })
        
     
                Post.update({ like_count: sequelize.literal('like_count + 1') }, { where: { postid: postid } });

                return res.json(like)
            
        } else {

            const likedelete = await Like.findOne({ where: {userid , postid } })
  
            await likedelete.destroy()
            Post.update({ like_count: sequelize.literal('like_count -1') }, { where: { postid: postid } });
            return res.json({ message: 'like deleted!' })
        }
      

    }   catch (err) {
        console.log(err)
        return res.status(500).json(err)
      }
})
/// like delete action 
app.delete('/post/like', async (req, res) => {
    const { userid, postid } = req.body;
    try {
      const like = await Like.findOne({ where: {userid , postid } })
  
      await like.destroy()
      Post.update({ like_count: sequelize.literal('like_count -1') }, { where: { postid: postid } });
      return res.json({ message: 'like deleted!' })
    } catch (err) {
      console.log(err)
      const like = await Like.create({ userid, postid })
      Post.update({ like_count: sequelize.literal('like_count + 1') }, { where: { postid: postid } });

      return res.json(like)
    }
  })