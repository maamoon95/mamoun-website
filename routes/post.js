const express = require('express');
const router = express.Router();
const db = require('../config/db');
const { sequelize, User, Post, Like , Notification } = require('../models')
const { Sequelize } = require('sequelize');
const { model } = require('../config/db');
const Op = Sequelize.Op;

// Create post
router.post('/', (req, res) => {
    const { userid, body } = req.body;
   Post.create({ userid, body })
    
       .then(post => {
        var ptitle = body.slice(0, 22)+ '...';
        Notification.create({ userid,actionid: userid, body: 'your post "' + ptitle + '" has been created' , postid: post.postid , link : "https://localhost/post/"+post.postid})
           res.json(post)
       })
    .catch (err => res.status(500).json(err)) 
})
// get post by ID || Params
router.get('/:postid', (req, res) => {
    const postid = req.params.postid;
    if (postid) {
       // console.log(postid);
        Post.findOne({ where: { postid } })
            .then(post => {
                
                res.json(post)
            })
            .catch(err => res.status(500).json({ error: 'Something went wrong' }));
    } 
})
// get post by ID || Json request
router.get('/', (req, res) => {
    const { postid } = req.body;
    if (postid) {
    //    console.log(postid);
        Post.findOne({ where: { postid } })
            .then(post => res.status(200).json(post))
            .catch(err => res.status(500).json({ error: 'Something went wrong' }));
    } 
})

// edit Post by ID with params
router.put('/:postid', (req, res) => {
    const { editbody } = req.body;
    const postid = req.params.postid;
    console.log(postid);
        //sending query to check if post exist
    Post.findOne({ where: { postid } })
        .then(post => {
            const postcheck = post;
                //check if post exists
            if (!postcheck) {
                res.json({ message: 'post is not exist or deleted' })
            } else {
                   //update post
                Post.update({ body: editbody }, { where: { postid: postid } })
                    .then(post => res.status(200).json(post))
                     // note: if edited seccusfully , it should send number 1
                    .catch(err => res.status(500).json({ error: 'Something went wrong' }));
            }
    })
})

// edit Post by ID with  Json
router.put('/', (req, res) => {
    const {  postid ,editbody } = req.body;
    console.log(postid);
    //sending query to check if post exist
Post.findOne({ where: { postid } })
    .then(post => {
        const postcheck = post;
            //check if post exists
        if (!postcheck) {
            res.json({ message: 'post is not exist or deleted' })
        } else {
               //update post
            Post.update({ body: editbody }, { where: { postid: postid } })
                .then(post => res.status(200).json(post))
                 // note: if edited seccusfully , it should send number 1
                .catch(err => res.status(500).json({ error: 'Something went wrong' }));
        }
})
})
// Delete Post by ID with params
router.delete('/:postid', (req, res) => {
    const { editbody } = req.body;
    const postid = req.params.postid;
    console.log(postid);
        //sending query to check if post exist
    Post.findOne({ where: { postid } })
        .then(post => {
            const postcheck = post;
                //check if post exists
            if (!postcheck) {
                res.json({ message: 'post is not exist or deleted' })
            } else {
                   //update post
                Post.destroy({ where: { postid: postid } })
                    .then(post => res.status(200).json(post))
                     // note: if deleted seccusfully , it should send number 1
                    .catch(err => res.status(500).json({ error: 'Something went wrong' }));
            }
    })
})
// Delete Post by ID with  Json
router.delete('/', (req, res) => {
    const {  postid ,editbody } = req.body;
    console.log(postid);
    //sending query to check if post exist
     Post.findOne({ where: { postid } })
    .then(post => {
        const postcheck = post;
            //check if post exists
        if (!postcheck) {
            res.json({ message: 'post is not exist or deleted' })
        } else {
               //update post
            Post.destroy({ where: { postid: postid } })
                .then(post => res.status(200).json(post))
                 // note: if deleted seccusfully , it should send number 1
                .catch(err => res.status(500).json({ error: 'Something went wrong' }));
        }
})
})

module.exports = router;
        
    
