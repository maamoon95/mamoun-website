const express = require('express');
const router = express.Router();
const db = require('../config/db');
const { sequelize, User, Post, Like } = require('../models')
const { Sequelize } = require('sequelize');
const Op = Sequelize.Op;



router.get('/users', (req, res) =>
    
    User.findAll()
        .then(users => res.json(users))
        .catch(err => res.status(500).json({ error: 'Something went wrong' })));
        
    
