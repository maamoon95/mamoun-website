const express = require('express');
const router = express.Router();
const db = require('../config/db');
const { sequelize, User, Post, Like } = require('../models')
const { Sequelize } = require('sequelize');
const { model } = require('../config/db');
const Op = Sequelize.Op;
const session = require('express-session');

router.get('/login', (req, res) => {
    const { email, password } = req.body;
    
    if (!req.session.userid) {
        if (!email & !password) {
            res.send('password and email are empty !');
        } else if (!email) {
            res.send('enter email');
        } else if (!password) {
            res.send('enter password');
        } else if (email || password) {
            // The following code return an instance of the user if it was found.
            User.findOne({ where: { email } })
                .then(user => {
                    if (user) {// check if email exist in db
                        // The following code chech for password
                        User.findOne({ where: { email, password } })
                            .then(user => {
                                // if ok it well add session
                                if (user) {
                                    console.log("auth ok")
                                    req.session.userid = user.userid;
                                    console.log("login seccusful")
                                    res.json("login success!");
                                } else if (!user) {  //// if not wrong password
                                    res.status(500).json("Wrong password")
                                }
                            }).catch(err => {
                                console.log(err)
                                res.status(500).json("internal error: " + err)
                            });
                    } else if (!user) {  /// if email is not there :
                        res.status(500).json("error: " + "Email " + email + " does not exist")
                    }
                }).catch(err => res.status(500).json("internal error: " + err));
            
        } else {
            res.status(500).json("Bug found !, contact the administrator");
        }
    } else {
        res.json('already logged in')
    }
});

// login check tester
router.get('/test', (req, res, err) => {
    if (req.session.userid) {

        console.log(req.session.userid);
        res.json("userid is : " + req.session.userid);
    } else {
        
        res.json("Please login");
    }
});

module.exports = router;