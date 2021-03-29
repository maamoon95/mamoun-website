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
const { sequelize, User, Post, Like , Notification } = require('./models');
const user = require('./models/user');
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



// users Functions
app.use('/users', require('./routes/user'));

//// create edit delete Post
app.use('/post', require('./routes/post'));

// like dislike route
app.use('/', require('./routes/like'));

/// login function
app.use('/', require('./routes/login'));
