const express = require('express');
const router = express.Router();
const { loggedinstatus } = require('../middleware/authentication');
const {likefunc} = require('../controllers/likecontroller');


//post Like create and delete

// Create post
router.post('/post/like',loggedinstatus, likefunc,(req, res) => {})


module.exports = router;
        
    
