const express = require('express');
const router = express.Router();
const { login } = require('../controllers/adminiControllers/authController.js');
const { 
    getDashboardData,
    getDashboardCity,
    downloadDashboardData,
    downloadDashboardCity,
} = require('../controllers/adminiControllers/dashboardController.js');

// controllers

// login route
router.post('/newadminLoginSession', login);

// dashboard routes
router.get('/dashboard', getDashboardData);
router.get('/dashboard/:city', getDashboardCity);
router.get('/dashboard/download', downloadDashboardData);
router.get('/dashboard/download/:city', downloadDashboardCity);


module.exports = router;