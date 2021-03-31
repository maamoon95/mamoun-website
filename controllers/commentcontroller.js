const { sequelize, User, Post, Like , Notification , Comment } = require('../models')

function checkpostc(req, res, next) {
    var {body , postid} = req.body;
   postid = req.body.postid;
   if (!postid) return res.status(500).json(message = "please enter valid post id")
   if (!body) return res.status(500).json(message= "please enter the edited body")
   Post.findOne({ where: { postid } })
       .then(post => {
           
           postcheck = post;
           //check if post exists
           if (!postcheck) {
               return res.status(404).json({ message: 'post is not exist or deleted' })
           } else {
               // passing variable to the next function
               postcheck = post;
              body =  body ;
               postid = req.body.postid;
               next()
           }
       })
}
/////////////////////////////////
////////////////////////////////////////////////////////////////////////////////
/////////////////////////
function createcomment(req, res) {
    const { body, postid } = req.body;
    // create comment if post found
    Comment.create({ postid, userid, body })
   
        .then(comment => {
             // prepair title for the comment
             var ptitle = body.slice(0, 14) + '..';
    //        console.log(username);
            // create notification if the post is not for the user
            if (postcheck.userid != userid) {
                // retrieve user who commented name
               
                       
                        // if user found with no error
                        if (user) {
                            // create notification
                            Notification.create({ userid: postcheck.userid, commentid: comment.commentid, postid, actionid: userid, body: username + ' commented your post :' + '"' + ptitle + '...' + '"', link: "https://localhost/post/" + postcheck.postid  })
                                .then(notification => {
                                    console.log('notification sent seccusfully/')
                                    res.json(message = "Comment " + "'" + ptitle + "'" + " sent seccusfully!")
                                })
                                .catch(err => {
                                    console.log('error in notification')
                                    res.json(message = "comment " + "'" + ptitle + "'" + " sent but error in notification")
                                });
                        }
                        // end user retrieve
                 
                // if the user commented to him self, it should not send notification
            } else if (postcheck.userid == userid) {
                res.json(message = "commented seccusfully to your post: "+ ptitle)
            }
            /// end create notification
   
        })
}
function editcomment(req, res) {

    const { postid, commentid , body} = req.body;
                Comment.findOne({ where: {  commentid } })
                    .then(comments => {

                        // if comment excist
                        if (comments) {
                            //////////////////////////////////////////////////////////////////////////////////////////////
                            ///////////////////////////// Delete Like //////////////////////////////////////// 
                            // delete like
                            Comment.update({body}, { where: { userid, postid, commentid } })
                                // if like deleted
                                .then(comment => {
                               
                                    res.json( 'comment edited to ' + body)
                                }).catch(err => res.status(500).json(err))
                            //////////////////////////////////////////////////////////////////////////////////////////////
                            ///////////////////////////// End Delete Comment //////////////////////////////////////// 
                        } else if (!comments) {
                            res.json(message = "comment doesnt exist")
                        }
                    }).catch(err => res.status(500).json("comment not found"))
            
        
   
 }
function deletecomment(req, res) {
    postid = req.body.postid;
    commentid = req.body.commentid;
    console.log(userid)
    Comment.findOne({ where: {  commentid:commentid } })
        .then(comments => {
console.log(comments)
            // if comment excist
            if (comments) {
                //////////////////////////////////////////////////////////////////////////////////////////////
                ///////////////////////////// Delete Like //////////////////////////////////////// 
                // delete like
                Comment.destroy({ where: { userid, postid, commentid } })
                    // if like deleted
                    .then(comment => {
                        // delete notification
                        Notification.destroy({ where: { postid, actionid: userid, commentid: comments.commentid } })
                        // post comment count edit
                       Post.update({ com_count: sequelize.literal('com_count - 1') }, { where: { postid: postid } });
                      return  res.json( 'comment deleted')
                    }).catch(err => res.status(500).json(message = "You Are not the owner"))
                //////////////////////////////////////////////////////////////////////////////////////////////
                ///////////////////////////// End Delete Comment //////////////////////////////////////// 
            }if (!comments) {
                res.json(message = "comment doesnt exist")
            }
        }).catch(err => res.status(500).json("comment not found"))
}



  module.exports = { createcomment ,editcomment , deletecomment , checkpostc};