const express = require('express');
const router = express.Router();
const homeController = require('../controllers/home_controller');
const authController = require('../controllers/authController');
const itemController = require('../controllers/Item_controller');
const cartController = require('../controllers/cart_controller');
const checkoutController = require('../controllers/checkout_controller');

const passport = require('passport');

router.get('/',homeController.home);

router.get('/addtocart',passport.checkAuthentication,itemController.makeOrder);

// ------ Route for Auth ---- // 
router.use('/auth',require('./auth'));




router.get('/cart',cartController.cart);

router.get('/checkout',checkoutController.checkout);

module.exports = router;

