const express = require('express');
const router = express.Router();
const homeController = require('../controllers/home_controller');
const authController = require('../controllers/authController');
const itemController = require('../controllers/Item_controller');
const passport = require('passport');

router.get('/',homeController.home);
router.get('/addtocart',passport.checkAuthentication,itemController.makeOrder);

// ------ Route for Auth ---- // 
router.use('/auth',require('./auth'));

module.exports = router;

