var passport = require('passport');
const User = require('../models/User');
const Cart = require('../models/Cart');
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

module.exports = passport;