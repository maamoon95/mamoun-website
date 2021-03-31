const {  Post, Notification } = require('../models')

function createpost(req, res) {
    const { body } = req.body;
        Post.create({ userid, body })
    
            .then(post => {
                var ptitle = body.slice(0, 22) + '...';
                Notification.create({ userid, actionid: userid, body: 'your post "' + ptitle + '" has been created', postid: post.postid, link: "https://"+process.env.webaddress+"/post/" + post.postid })
                res.json(post)
            })
            .catch(err => res.status(500).json(err))
}
function getpostbyid(req, res) {
    const { postid } = req.body;
    if (postid) {
        //    console.log(postid);
        Post.findOne({ where: { postid } })
            .then(post => res.status(200).json(post))
            .catch(err => res.status(500).json({ error: 'Something went wrong' }));
    }
  }
function getpostsforuser(req, res) {
    const userrid = req.params.userrid
    console.log(userrid)
    Post.findAll({ where: { userid:userrid } })
        .then(posts => {
            return res.status(200).json(posts.userid)
        })
    .catch(err => res.status(500).json({ error: 'Something went wrong' }));
}
function checkpost(req, res, next) {
     editbody = req.body.editbody;
    postid = req.body.postid;
    if (!postid) return res.status(500).json(message = "please enter valid post id")
    if (!editbody) return res.status(500).json(message= "please enter the edited body")
    Post.findOne({ where: { postid } })
        .then(post => {
            
            postcheck = post;
            //check if post exists
            if (!postcheck) {
                return res.status(404).json({ message: 'post is not exist or deleted' })
            } else {
                // passing variable to the next function
                postcheck = post;
               editbody =  editbody ;
                postid = req.body.postid;
                next()
            }
        })
}
function checkpostdel(req, res, next) {
   
   postid = req.body.postid;
   if (!postid) return res.status(500).json(message = "please enter valid post id")

   Post.findOne({ where: { postid } })
       .then(post => {
           
           postcheck = post;
           //check if post exists
           if (!postcheck) {
               return res.status(404).json({ message: 'post is not exist or deleted' })
           } else {
               // passing variable to the next function
               postcheck = post;
            
               postid = req.body.postid;
               next()
           }
       })
}
function editpost(req, res) {
    
                if (postcheck.userid == userid) {
                    //update post
                    Post.update({ body: editbody }, { where: { postid: postid } })
                        .then(post => res.status(200).json("your post has been updated"))
                        // note: if edited seccusfully , it should send number 1
                        .catch(err => res.status(500).json({ error: 'Something went wrong' }));
                } else if (postcheck.userid != userid) {
                    res.json("you are not the owner of the post")
                }
            }
function deletepost(req, res) {
    
       
            if (postcheck.userid == userid) {
                //delete post
                Post.destroy({ where: { postid: postid } })
                    .then(post => res.status(200).json(message = "Post Deleted seccusfully"))
                    // note: if deleted seccusfully , it should send number 1
                    .catch(err => res.status(500).json({ error: 'Something went wrong' }));
            } else if (postcheck.userid != userid) {
                res.json("you are not the owner of the post")
            }
            
   
}
  module.exports = { createpost ,getpostbyid ,checkpostdel,  getpostsforuser, editpost, checkpost , deletepost};