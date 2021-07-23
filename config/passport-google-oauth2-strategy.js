const passport = require('passport');
const googleStrategy = require('passport-google-oauth').OAuth2Strategy;

const crypto = require('crypto');
const User = require('../models/User');
const Cart = require('../models/Cart');
const environment = require('./environment');
passport.use(new googleStrategy({

    clientID: process.env.google_clientID,
    clientSecret : process.env.google_clientSecret,
    callbackURL : environment.google_callbackURL

}, function(accessToken,refreshToken,profile,done){
    
    User.findOne({email:profile.emails[0].value})
        .exec(function(err,user){

            if(err){console.log(`${err},Error while google sign-up`);return;}

            if(user){
                return done(null,user);
            }
            else{
                User.create({
                    email : profile.emails[0].value,
                    name:profile.displayName,
                    password:crypto.randomBytes(20).toString('hex')
                }, async (err,user) => {
                    if(err){console.log(`${err}`);return;}

                    let cart = await  Cart.create({user : user});

                    let finaluser = await User.findByIdAndUpdate(user._id,{cart:cart});
                    
                    console.log("User created");
                    
                    return done(null,finaluser);
                }
                )
            }

        });
}

));

module.exprots = passport;