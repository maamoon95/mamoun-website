const express = require('express');
const router = express.Router();
const { loggedinstatus } = require('../middleware/authentication');
const { getnotifications } = require('../controllers/notifcontroller');

/// routed notification 


router.get('/notification',loggedinstatus, getnotifications, (req, res) => {})

module.exports = router;
        
    
