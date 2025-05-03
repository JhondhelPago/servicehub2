const express = require('express');
const router = express.Router();
const { login } = require('../controllers/adminiControllers/authentication.js');

// controllers

// login route
router.post('/newadminLoginSession', login);

module.exports = router;