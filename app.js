const express = require('express');
const exphbs = require('express-handlebars');
const session = require('express-session');
const cookieParser = require('cookie-parser');
const flash = require('connect-flash');
const morgan = require('morgan');
const methodOverride = require('method-override');
const bodyParser = require('body-parser');
const JSAlert = require("js-alert");
const path = require('path');
const { Sequelize } = require('sequelize');
 //register app
const app = express();
const PORT = process.env.PORT || 3000;
app.listen(PORT, console.log('server started on port ',PORT));
 //connect to database nad start server
const dbconnect = new Sequelize('sequelize_db', 'postgres', 's5134747h', {
    host: 'localhost',
    dialect: 'postgres'
    
         
      
});
// testing connection
dbconnect.authenticate()
    .then(() => console.log('db connected seccusfully'))
    .catch(err => console.log('db error: ' + err))
    
    
  
 //register view engine
app.set('views', './view');
app.set('view engine', 'ejs');
//using cookies and flash alert system
app.use(cookieParser());
app.use(session({ cookie: { maxAge: 60000 }, 
    secret: 'woot',
    resave: false, 
    saveUninitialized: false}));
app.use(flash());
///////



app.use(morgan('dev'));
//middleware and static
//app.use('/', express.static('client/home'));
app.use(express.static('./view'));
//app.use to use methods put and delete from html
app.use(bodyParser.urlencoded({ extended: false }));
app.use(methodOverride('_method'));
//pass data from html post function to here using middleware
app.use(express.urlencoded({ extended: true }));
////////////////////////////////////////////////
console.log('hi there');





/////////////////////////////////////////////////////////////
///
// sandbox and test creating blog in database
// app.get('/add-blog', (req, res) => {
//     //create constant for each blog
//     const blog = new Blog({
//         title: 'forth blog',
//         snippet: 'this is forth tested blog',
//         body: 'lorem ipsum and asduf ioausd casda'
//     });


//     //save blog in database
//     blog.save()
//         .then((result) => {
//             res.send(result)
//         })
//         .catch((err) => {
//             console.log(err);
//         });
// });
// app.get('/all-blog', (req, res) => {
  
//     //fetch blog in database
//     Blog.find().sort({createdAt: -1 })
//         .then((result) => {
//             res.send(result)
//         })
//         .catch((err) => {
//             console.log(err);
//         });
// })



// //get index

// app.get('/', (req, res) => {
//     console.log(req.url);
//     var urrl = req.url;
//     const active = '"active"';
// //fetch blog in database
// Blog.find().sort( { id: -1 } )
//     .then((result) => {
//         const blogs = result;
//         res.json({ alert });
//         res.render('index', { title: 'Home', blogs, active , urrl});
//     })
//     .catch((err) => {
//         console.log(err);
//     })
// })
// //get about
// app.get('/about', (req, res) => {
//     var urrl = req.url;
//     const active = '"active"';
//     res.render('about', {title: 'About', active , urrl});

//     console.log(req.url);
// });
// //get create
// app.get('/blogs', (req, res) => {
//     var urrl = req.url;
//     const active = '"active"';
//     res.render('blogs', { title: 'Create post', active , urrl, flash: req.flash('msg') });

//     console.log(req.url);
// });
// // get blog by id
// app.get('/post/:id', (req, res) => {

//     const id = req.params.id;
//     Blog.findById(id)
//         .then(result => {
//             var urrl = req.url;
//             const active = '"active"';
//             const blogs = result;
//            // console.log(blogs);
//             res.render('post', { blogs, title: result.title , active , urrl,});
//         })
//         .catch(err => {
//             console.log(err);
//         })
// });

// // get blog by id 2 test
// app.get('/post2/:id', (req, res) => {

//     const id = req.params.id;
//     Blog.findById(id)
//         .then(result => {
//             var urrl = req.url;
//             const active = '"active"';
//             const blogs = result;
//            // console.log(blogs);
//             res.render('post2', { blogs, title: result.title , active , urrl,});
//         })
//         .catch(err => {
//             console.log(err);
//         })
// });
// //delete blog testt sandbox

// app.delete('/post2/:id', (req, res) => {
//     const body = req.body;
//     const id = body.id;
//     console.log(id);
  
//      Blog.findByIdAndDelete(id)
//        .then(result => {
//             console.log('deleted test');
            
         
//    })
//       .catch(err => {
//           console.log(err);
//          console.log('error');
        
     
     
//        });
//   });
// //Delete blog
// app.delete('/blogs/:id', (req, res) => {
 
//      Blog.findByIdAndDelete(id)
//        .then(result => {
//            console.log('deleted');
//             res.json({ redirect: '/', alert: 'deleted seccusfully' });
         
//       })
//    .catch(err => {
//           console.log(err);
//           console.log('error');
//           res.json({ redirect: '/' });
     
     
//         });
//   });
// //post plog

// app.post('/blogs', (req, res) => {
//         //create constant for each blog
//         const blog = new Blog(req.body);
//         //save blog in database
//     blog.save()
//         .then((result) => {
//                 //function of redirect

//             console.log(result);
     
//             req.flash('msg', 'Added to DB Seccusfully');
//             var message = res.locals.message = req.flash();
//             var urrl = '/blogs';
//             const active = '"active"';
//             res.render('blogs', { title: 'Create post', active , urrl, flash: req.flash('msg') });
        
//             console.log(message); // { success_msg: [ 'Successfully Registered' ] }
               
              
              
        
//     })
//     .catch((err) => {
//         console.log(err);
         
//         req.flash('msg', 'eror');
//         var message = res.locals.message = req.flash();
//         var urrl = '/blogs';
//         const active = '"active"';
//         res.render('blogs', { title: 'Create post', active , urrl, flash: req.flash('msg') });
    
//         console.log(message); // { success_msg: [ 'Successfully Registered' ] }
           
//     });

// });

// // get 404
// app.use((req, res) => {
//     var urrl = req.url;
//     const active = '"active"';
//     res.status(404).render('404', { title: 'Not Found' , active , urrl});
//     console.log(req.url);
// });


