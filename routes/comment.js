const express = require('express');
const router = express.Router();

const { loggedinstatus } = require('../middleware/authentication');
const { createcomment, checkpostc , deletecomment, editcomment } = require('../controllers/commentcontroller')
// post create comment by post ID || Json


router.post('/post/comment',loggedinstatus,checkpostc,createcomment, (req, res) => {
})


/// delete comment

router.delete('/post/comment',loggedinstatus,deletecomment, (req, res) => {                          
})

/// edit comment
router.put('/post/comment',loggedinstatus,editcomment ,(req, res) => {                
})
module.exports = router;
        
    
