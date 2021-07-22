var passport = require('passport');
const User = require('../models/User');
var facebookStrategy = require('passport-facebook').Strategy;
var crypto = require('crypto');

const environment = require('./environment');

passport.use(new facebookStrategy({
    clientID : process.env.facebook_clientID,
    clientSecret : process.env.facebook_clientSecret,
    callbackURL : environment.facebook_callbackURL
},
function(accessToken, refreshToken , profile , done){

    console.log(profile);
    User.findOne({email:profile.emails[0].value})
    .exec(function(err,user){

        if(err){console.log(`${err},Error while facebook-sign-up`);return;}

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

module.exports = passport;