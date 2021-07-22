const passport = require('passport');
const googleStrategy = require('passport-google-oauth').OAuth2Strategy;

const crypto = require('crypto');
const User = require('../models/User');
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
                }, (err,user) => {
                    if(err){console.log(`${err}`);return;}

                    return done(null,user);
                }
                )
            }

        });
}

));

module.exprots = passport;