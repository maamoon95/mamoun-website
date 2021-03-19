const express = require('express');
const app = express();

//register view engine
app.set('views', './view');
app.set('view engine', 'ejs');
//listen for requist
app.listen(3000);
//app.use('/', express.static('client/home'));
app.use(express.static('./view'));
//get index

app.get('/', (req, res) => {
    const blogs = [{ title: 'how to start node', snippet: 'lorem ipsum jhsad liadsfu asdiu asdol' },{ title: 'why node is important', snippet: 'lorem ipsum jhsad liadsfu asdiu asdol' },{ title: 'playing is not important', snippet: 'lorem ipsum jhsad liadsfu asdiu asdol' },{ title: 'working is important', snippet: 'lorem ipsum jhsad liadsfu asdiu asdol' },];
    var urrl = req.url;
    const active = '"active"';
    res.render('index', { title: 'Home', blogs, active , urrl});
    console.log(req.url);
    
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