const express = require('express');

const router = express.Router();
const { loggedinstatus } = require('../middleware/authentication');
const { checkpostdel, createpost, getpostsforuser, getpostbyid, editpost, checkpost, deletepost } = require('../controllers/postcontroller');

// Create post
router.post('/post',loggedinstatus, createpost ,(req, res) => {})
// get post by ID || Json request
router.get('/post', loggedinstatus,getpostbyid, (req, res) => {})
// get post for user
router.get('/:userrid/posts', loggedinstatus,getpostsforuser, (req, res) => {})
// edit Post by ID with  Json
router.put('/post', loggedinstatus,checkpost, editpost, (req, res) => {})
// Delete Post by ID with  Json
router.delete('/post/delete',loggedinstatus,checkpostdel, deletepost, (req, res) => {})

module.exports = router;
        
    
