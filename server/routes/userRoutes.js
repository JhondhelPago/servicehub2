const express = require('express');
const router = express.Router();
const {
    clientuser_login,
} = require('../controllers/userControllers/authController.js');

router.post('/loginsession', clientuser_login);

module.exports = router;