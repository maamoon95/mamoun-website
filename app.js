const express = require('express');
const exphbs = require('express-handlebars');
const session = require('express-session');
const methodOverride = require('method-override');
const app = express();
const bodyParser = require("body-parser");
const cookieParser = require('cookie-parser');
var cookieSession = require('cookie-session')
const PORT = process.env.PORT || 3000;
require('dotenv').config()

app.use(cookieSession({
    name: 'tempsession',
    keys: ['afdasas']
  }))
 //register view engine
 app.set('views', './view');
 app.set('view engine', 'ejs');
// Database connection controller
require('./controllers/dbconnect');
// syncing tables
require('./controllers/tablesync');
 //starting server localhost
app.listen(PORT, console.log('server started on port ',PORT));

// use session
    app.use(bodyParser.urlencoded({extended:true}))
    app.use(bodyParser.json())
    app.use(cookieParser())
/////// using express and method override for http requests
app.use(express.json());
app.use(methodOverride('_method'));
////////////////////////////////////////////////



// users Functions
app.use(require('./routes/user'));

//// create edit delete Post
app.use(require('./routes/post'));

// like dislike route
app.use( require('./routes/like'));

/// login function
app.use( require('./routes/login'));

// comment function
app.use( require('./routes/comment'));
// notification function
app.use( require('./routes/notification'));

// 