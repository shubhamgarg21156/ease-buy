const express = require('express');
const router = express.Router();
const homeController = require('../controllers/home_controller');
const faqController = require('../controllers/faq_controller');
const authController = require('../controllers/authController');
const itemController = require('../controllers/Item_controller');
const cartController = require('../controllers/cart_controller');
const checkoutController = require('../controllers/checkout_controller');
const adminController = require('../controllers/admin_controller');

const passport = require('passport');

router.get('/',homeController.home);

router.get('/addtocart',passport.checkAuthentication,itemController.makeOrder);
router.get('/removeItem',passport.checkAuthentication,itemController.removeItem);
router.get('/product',itemController.openProduct);
router.get('/categories',itemController.categories);
router.get('/admin',adminController.admin);
router.post('/admin/addtodb',adminController.addtodb);
router.get('/faq',faqController.faq);

// ------ Route for Auth ---- // 
router.use('/auth',require('./auth'));


// ---- Route for cart ----- //
router.get('/cart',passport.checkAuthentication,cartController.cart);

router.get('/checkout',checkoutController.checkout);

module.exports = router;

