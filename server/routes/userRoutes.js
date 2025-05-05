const express = require('express');
const router = express.Router();
const {clientuser_login} = require('../controllers/userControllers/authController.js');
const {FetchInboxClient} = require('../controllers/userControllers/chatController.js')

router.post('/loginsession', clientuser_login);


// chat components controllers
router.get('/mailbox/client/:clientuserId', FetchInboxClient);

module.exports = router;