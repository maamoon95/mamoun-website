  
const jwt = require('jsonwebtoken');
const { User, Rtoken } = require('../models');
const Cookies = require('cookies')

function generateAccessToken(usert) {
    return jwt.sign(usert, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '60s' })
}
        
function loggedinstatus(req, res, next) {
    //getting cookies informmation
    authlogged = req.cookies.authlogged
    authHeader = req.cookies.authorization
    authuserid = req.cookies.authuserid

    if (authlogged == 'yes'  && authHeader  && authuserid) {
        // check a token
        console.log('reached 1')
        jwt.verify(authHeader, process.env.ACCESS_TOKEN_SECRET, (err, loggeduserid) => {
            //console.log(err)
            if (err) {
                // if token is not valid
                if (err.name == 'JsonWebTokenError') {
                    Rtoken.destroy({ where: { userid: authuserid}})
                    res.clearCookie('authlogged')
                    res.clearCookie('authorization')
                    res.clearCookie('authuserid')
                    return res.json('Please login')
                    // if token is expired then it should check for refresh token
                } if (err.name == "TokenExpiredError" || err.message == "jwt expired") {
                    Rtoken.findOne({ where: { atoken: authHeader } })
                        .then(rtoken => {
                            /// if refresh token is found in db it should generate new token
                            if (rtoken) {
                                // defining information array for generating token
                                var usert = { name: rtoken.name, userid: rtoken.userid };
                                const accessToken = generateAccessToken(usert)
                                Rtoken.update({ atoken: accessToken }, { where: { userid: rtoken.userid } })
                             // setting new token in cookies
                                res.cookie('authorization', accessToken, { maxAge: 9000000 })
                                loggeduserid = usert;
                                userid = loggeduserid.userid;
                                username = loggeduserid.name;
                                // going next to the next functiom and sending user details
                                   next()
                            } if (!rtoken) {
                                // if refresh token where not found it should clear all cookies and ask for login
                                return res.clearCookie('authlogged').clearCookie('authorization').json("you have been logged out.. please login again")
                            }

                        }).catch(err => {
                            return console.log(err)
                        })
                }
                // if token is valid and not expired it should go next and pass user data
            } if (loggeduserid) {
                Rtoken.findOne({ where: { atoken: authHeader } })
                    .then(rtoken => {
                        if (rtoken) {
                       
                            req.loggeduserid = loggeduserid 
                            loggeduserid = loggeduserid 
                           userid = loggeduserid.userid;
                             username = loggeduserid.name;
                              next()
                    
                         //    res.json('token is valid .. refresh token found .. next' +  loggeduserid )
                        } if (!rtoken) {
                            // here it should send to login page and delete all cookies
                            res.clearCookie('authlogged')
                            res.clearCookie('authorization')
                            res.clearCookie('authuserid')
                           return res.json("jwt is valid but its not in the database , please relogin")
                        }

                    })
              
            }else {
                //return res.json(err) 
            }
        })
        /// if user had logged out
    } if (authlogged != 'yes' && authuserid) {
        console.log('reached 2')
        // delete all tokens then ask for login
        // add function to delete refresh token
      //  cookies.set('authorization', {expires: Date.now()});
        Rtoken.destroy({ where: { userid:authuserid}})
        res.clearCookie('authlogged')
        res.clearCookie('authorization')
        res.clearCookie('authuserid')
            res.json(message = "login failed... logging out")
        return
        // if we had missing cookies
    } if (!authuserid || !authlogged || !authHeader) {
        console.log('reached 3')
        // ask for login
        res.clearCookie('authlogged')
        res.clearCookie('authorization')
        res.clearCookie('authuserid')
        return  res.json("You are not logged in ... please login")
      
    }
 
}
// this function is used before login to check if logged in before sending request
function checklogin(req, res, next) {
   // defining cookies data
    authlogged = req.cookies.authlogged
    authHeader = req.cookies.authorization
    authuserid = req.cookies.authuserid
    if (authlogged == 'yes'  && authHeader  && authuserid) {
        // check a token
        console.log('reached 1')
        jwt.verify(authHeader, process.env.ACCESS_TOKEN_SECRET, (err, loggeduserid) => {
            //console.log(err)
            if (err){
                if (err.name == 'JsonWebTokenError') {
                    Rtoken.destroy({ where: { userid: authuserid}})
                    res.clearCookie('authlogged')
                    res.clearCookie('authorization')
                    res.clearCookie('authuserid')
next()
                } if (err.name == "TokenExpiredError" || err.message == "jwt expired") {
                    Rtoken.findOne({ where: { atoken: authHeader } })
                        .then(rtoken => {
                            if (rtoken) {
                                // here it should build new token
                                var usert = { name: rtoken.name, userid: rtoken.userid };
                                const accessToken = generateAccessToken(usert)
                                Rtoken.update({ atoken: accessToken }, { where: { userid: rtoken.userid } })
                                res.cookie('authorization', accessToken, { maxAge: 9000000 })
                                loggeduserid = usert;
                                userid = loggeduserid.userid;
                                  username = loggeduserid.name;
                                  return res.json("already logged in")
                            } if (!rtoken) {
                                // here it should send to login page and delete all cookies
                                res.clearCookie('authlogged').clearCookie('authorization')
                                next()
                            }

                        }).catch(err => {
                            return console.log(err)
                        })
                }
            } if (loggeduserid) {
                Rtoken.findOne({ where: { atoken: authHeader } })
                    .then(rtoken => {
                        if (rtoken) {
                            // here it should build new token
                            req.loggeduserid = loggeduserid 
                            //console.log(loggeduserid.userid);
                            loggeduserid = loggeduserid 
                           userid = loggeduserid.userid;
                             username = loggeduserid.name;
                             return res.json("already logged in")
                    
                         //    res.json('token is valid .. refresh token found .. next' +  loggeduserid )
                        } if (!rtoken) {
                            // here it should send to login page and delete all cookies
                            res.clearCookie('authlogged')
                            res.clearCookie('authorization')
                            res.clearCookie('authuserid')
                           next()
                        }

                    })
              
            }else {
                //return res.json(err) 
            }
        })
    } if (authlogged != 'yes' && authuserid) {
        console.log('reached 2')
        // delete all tokens then ask for login
        // add function to delete refresh token
      //  cookies.set('authorization', {expires: Date.now()});
        Rtoken.destroy({ where: { userid:authuserid}})
        res.clearCookie('authlogged')
        res.clearCookie('authorization')
        res.clearCookie('authuserid')
         next()
    } if (!authuserid || !authlogged || !authHeader) {
        console.log('reached 3')
        // ask for login
        res.clearCookie('authlogged')
        res.clearCookie('authorization')
        res.clearCookie('authuserid')
       next()
      
    }
 
  }
  
module.exports = {loggedinstatus,checklogin , };