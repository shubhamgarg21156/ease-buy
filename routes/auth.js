const express = require('express');
const router = express.Router();
const passport = require('passport');

const authController = require('../controllers/authController');

// ---- Login Route ---- //
router.get('/login',authController.login);


//---- Authenticating the user to login ---- //
router.post('/login',passport.authenticate('local',
    {failureRedirect : '/auth/login'})
    ,authController.createSession);


// ---- Sign-up Post Handle ---- //    
router.post('/create',authController.create);

//---- Route for Logout ---- //
router.get('/logout',authController.logout);

// ----- Route for Google Login ---- //
router.get('/google',passport.authenticate('google',{
    scope : ['profile','email']
}));

router.get('/google/callback',passport.authenticate('google',{
    failureRedirect : "/auth/login"
}),authController.createSession);

router.get('/facebook',passport.authenticate('facebook',{
    // scope: ['publish_actions'] 
}));

router.get('/facebook/callback',passport.authenticate('facebook',{
    failureRedirect:'/auth/login',
    
}),authController.createSession);


module.exports=router; 