
const { sequelize, User, Post, Like, Notification } = require('../models')

function likefunc(req, res) {
   
    const { postid } = req.body;
    // if logged in
  
       
        ////////// check if liked:
       Like.findOne({ where: { userid, postid } })
           .then(like => {
               // if liked
               if (like) {
//////////////////////////////////////////////////////////////////////////////////////////////
 ///////////////////////////// Delete Like //////////////////////////////////////// 
                   // delete like
                   Like.destroy({ where: { userid, postid } })
                       // if like deleted
                       .then(like => {
                           // delete notification
                           Notification.destroy({ where: { postid, actionid: userid } })
                           // post like count edit
                           Post.update({ like_count: sequelize.literal('like_count - 1') }, { where: { postid: postid } });
                          return res.json(like + 'like deleted')
                       }).catch(err => res.status(500).json(err))
//////////////////////////////////////////////////////////////////////////////////////////////
 ///////////////////////////// End Delete Like //////////////////////////////////////// 
                   
                   /// if like does not excist:
               } else if (like === null) {
 //////////////////////////////////////////////////////////////////////////////////////////////
        /////////////////// Create Like ////////////////////////////////////////     

                Like.create({ userid, postid })
                .then(like => {
                   
        ////////////////////////////////////////////////////////////////////////////
 ///////////////////////////// Create notification ////////////////////////////////////////     
             
                   // find post owner to send notification to him
                    Post.findOne({ where: { postid: postid } })
                        .then(post => {
                            var post = post;
                           // console.log(post.postid);
                            // finding post owner  name
                            User.findOne({ where: { userid: post.userid } })
                            .then(user => {
                                var user = user;
                                /// const for the post title to put it in notification
                                var ptitle = post.body.slice(0, 21);
                                // sending notification
                                Notification.create({ userid: post.userid, postid, actionid: userid, body: username + ' liked your post ' + '"' + ptitle + '...' + '"', link: "https://"+process.env.webaddress+"/post/" + "?like=" + like.like_id + post.postid })
                                 // add count
                                 Post.update({ like_count: sequelize.literal('like_count + 1') }, { where: { postid: postid } });
                  return  res.json(like)
                  
 
                            }).catch(err => res.status(500).json(err))
                        }).catch(err => res.status(500).json(err))
 //////////////////////////////////////////////////////////////////////////////////////////////
                ////////////// End Create notification ///////////////             
                }).catch(err => res.status(500).json(err))
  //////////////////////////////////////////////////////////////////////////////////////////////
        //////////////////// End Create Like /////////////////////////////                
               } // end if like does not excist
            
        }).catch(err => res.json(err))   ////////// End check if liked:
 
   
    
  }
  
module.exports = { likefunc };