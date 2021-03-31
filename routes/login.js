const express = require('express');
const router = express.Router();
require('dotenv').config()
const { checklogin } = require('../middleware/authentication');
const { login} = require('../controllers/logincontroller');

//login api
router.get('/login',checklogin,login,(req, res) => {});

// login check tester
router.get('/logincheck', checklogin, (req, res) => {});

module.exports = router;