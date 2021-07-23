const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;

const User = require('../models/User');

passport.use(new LocalStrategy({
    
    usernameField : 'email',
    passwordField : 'password',
    passReqToCallback : true,
}, (req,email,password,done) => {

    User.findOne({email : email} , function(err,user){
        if(err){console.log(`${err}`)
        return done(err);};
            
    if(!user || user.password!=password){
        req.flash('error','Invalid Username/Password');
        console.log(`Password doesn't match`);
        return done(null,false);
    }

    return done(null,user);
});
}));

passport.serializeUser(function(user,done){
    done(null,user.id);
});

passport.deserializeUser(function(id,done){
    User.findById(id,function(err,user){
        if(err){console.log(`${err}`); return done(err)};
        return done(null,user);
    });
});

passport.checkAuthentication = (req,res,next) =>  {

    if(req.isAuthenticated()){
        return next();
    }

    return res.redirect('/auth/login');

}

passport.setAuthenticatedUser = (req,res,next) => {
    if(req.isAuthenticated()){
        res.locals.user = req.user;
    }
    next();
}

module.exports = passport;