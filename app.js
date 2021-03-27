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
// app.use('/users', require('./routes/listuser'));
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
  
//post Like create and delete
app.post('/post/like', async (req, res) => {
    const { userid, postid } = req.body;

    try {
        const likecheck = await Like.findOne({ where: { userid, postid } })
        console.log(likecheck);
        if (!likecheck) {
          
                const like = await Like.create({ userid, postid })
        
     
                Post.update({ like_count: sequelize.literal('like_count + 1') }, { where: { postid: postid } });

                return res.json(like)
            
        } else {

            const likedelete = await Like.findOne({ where: {userid , postid } })
  
            await likedelete.destroy()
            Post.update({ body: sequelize.literal('like_count -1') }, { where: { postid: postid } });
            return res.json({ message: 'like deleted!' })
        }
      

    }   catch (err) {
        console.log(err)
        return res.status(500).json(err)
      }
})
/// like delete action 
app.delete('/post/:postid', async (req, res) => {
    const { postid } = req.body;
    try {
        //check if post exists
        const postcheck = await Post.findOne({ where: { postid } })
        console.log(postcheck);
        if (!postcheck) {
            res.json({ message: 'post is not exist or already deleted' })
        } else {
            const post = await Post.findOne({ where: { postid } })
  
            await post.destroy()
      
            return res.json({ message: 'post deleted!' })
        }
    } catch (err) {
      console.log(err)
     
      return res.json('error' + err)
    }
})
  
//Edit post
app.put('/post/:postid', async (req, res) => {
    const { postid , editbody } = req.body;
    try {
        //check if post exists
        const postcheck = await Post.findOne({ where: { postid } })
        console.log(postcheck);
        if (!postcheck) {
            res.json({ message: 'post is not exist or deleted' })
        } else {
            const editpost = await Post.findOne({ where: { postid } })
            editpost.update({ body: editbody }, { where: { postid: postid } });
            return res.json(editpost)
        }
    } catch (err) {
      console.log(err)
      return res.json('error' + err)
    }
})
  

/// login function
app.get('/login', async function (req, res, err) {           
    
    const { email, password } = req.body;
    
if (!req.session.userid) {
   if (!email || !password) {
       res.send('login failed');
    } else {        
        // The following code return an instance of the user if it was found.
       try {
           const user = await User.findOne({ where: { email } })
           const pass = await User.findOne({where: { email, password} })
           // If the user was not found that means the credentials was wrong.
           if (user) {
               if (pass) {
                   console.log("auth ok")
                   req.session.userid = user.userid;
                 
                   res.json("login success!");
               } else {
                console.log("Password error")
                res.json("error: Wrong password, please try again")
               }
           } else {
               console.log("Email "+ email + " does not excist")
               res.json("error: "+"Email "+ email + "does not exist")
           }
       }catch (err) {
        console.log(err)
        return res.json('error:  ' + err)
      }
    }
} else {
    res.json('already logged in')
} 
});
app.get('/test', (req, res, err) => {
    if (req.session.userid) {
        
    
        console.log(req.session.userid);
        res.json("userid is : " + req.session.userid);
    } else {
        res.json("Please login");
    }
});
