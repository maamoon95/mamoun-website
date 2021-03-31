const express = require('express');
const router = express.Router();
const { User, } = require('../models')
const {handleErrors} = require('../controllers/handleerrors')


router.get('/users', (req, res) =>
    User.findAll()
        .then(users => res.json(users))
        .catch(err => res.status(500).json({ error: 'Something went wrong' })));

        //// create user
router.post('/users',(req, res) => {
    const { name , password , email } = req.body

    User.create({ name, password, email } )
        .then(user => res.status(200).json(user))
        .catch(err => {
            handleErrors(req,res,err);
        }) 
        
      
      
})
  

module.exports = router;
        
    
