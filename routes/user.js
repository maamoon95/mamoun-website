const express = require('express');
const router = express.Router();
const db = require('../config/db');
const { sequelize, User, Post, Like } = require('../models')
const { Sequelize } = require('sequelize');
const { model } = require('../config/db');
const Op = Sequelize.Op;



router.get('/', (req, res) =>
    
    User.findAll()
        .then(users => res.json(users))
        .catch(err => res.status(500).json({ error: 'Something went wrong' })));



        //// create user
router.post('/', (req, res) => {
    const { name , password , email } = req.body

    User.create({ name, password, email } )
        .then(user => res.status(200).json(user))
        .catch (err => res.status(500).json(err)) 
        
      
      
  })
module.exports = router;
        
    
