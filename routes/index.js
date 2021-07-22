const express = require('express');
const router = express.Router();
const homeController = require('../controllers/home_controller');
const authController = require('../controllers/authController');
const passport = require('passport');

router.get('/',homeController.home);


// ------ Route for Auth ---- // 
router.use('/auth',require('./auth'));

module.exports = router;

