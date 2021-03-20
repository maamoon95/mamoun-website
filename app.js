const express = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose');
const Blog = require('./models/blog');
 //register app
 const app = express();
 //connect to database
 const dbURI = "mongodb+srv://test:s5134747h@node.hkca4.mongodb.net/node?retryWrites=true&w=majority";
mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then((result) => app.listen(3000))
    .catch((err) => console.log(err))
 //register view engine
app.set('views', './view');
app.set('view engine', 'ejs');

// sandbox and test creating blog in database
app.get('/add-blog', (req, res) => {
    //create constant for each blog
    const blog = new Blog({
        title: 'first blog',
        snippet: 'this is first tested blog',
        body: 'lorem ipsum and asduf ioausd casda'
    });


    //save blog in database
    blog.save()
        .then((result) => {
            res.send(result)
        })
        .catch((err) => {
            console.log(err);
        });
});
app.get('/all-blog', (req, res) => {
  
    //fetch blog in database
    Blog.find()
        .then((result) => {
            res.send(result)
        })
        .catch((err) => {
            console.log(err);
        });
})


///////


app.use(morgan('dev'));
//middleware and static
//app.use('/', express.static('client/home'));
app.use(express.static('./view'));
//get index

app.get('/', (req, res) => {
    console.log(req.url);
    var urrl = req.url;
    const active = '"active"';
//fetch blog in database
Blog.find()
.then((result) => {
    const blogs = result;
    res.render('index', { title: 'Home', blogs, active , urrl});
})
.catch((err) => {
    console.log(err);
})
    

    
    
    
});
//get about
app.get('/about', (req, res) => {
    var urrl = req.url;
    const active = '"active"';
    res.render('about', {title: 'About', active , urrl});

    console.log(req.url);
});
//get blogs
app.get('/blogs/create', (req, res) => {
    var urrl = req.url;
    const active = '"active"';
    res.render('create', { title: 'Create post', active , urrl});

    console.log(req.url);
});

// get 404
app.use((req, res) => {
    var urrl = req.url;
    const active = '"active"';
    res.status(404).render('404', { title: 'Not Found' , active , urrl});
    console.log(req.url);
});



// app.get('/images/avatar.jpg', (req, res) => {
//          res.sendFile('./views/images/avatar.jpg', { root: __dirname });
// })