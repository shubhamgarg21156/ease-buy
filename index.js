require('dotenv').config();
const express = require('express');
const app = express();
const port = process.env.PORT || 8000;
const path = require('path');
const expressLayouts = require('express-ejs-layouts');
const sassMiddleware = require('node-sass-middleware');
const session = require('express-session');
const MongoStore = require('connect-mongo');
const flash = require('connect-flash');
const customMware = require('./config/middleware');

// ----- Passport Configuration ---- //
const passport = require('passport');
const passportLocal = require('./config/passport-local-strategy');
const GooglePassport = require('./config/passport-google-oauth2-strategy');
const FacebookPassport = require('./config/passport-facebook-strategy');

// -----  DB Configuration ----- //
const db = require('./config/mongoose');


// ---- EJS Configuration ----- //
app.use(express.static('./assets/'));
app.use(expressLayouts);

// -- Middleware for parsing data ----- //
app.use(express.urlencoded({ extended: true }));

// ----- Sass Middleware Configuration ---- //
app.use(sassMiddleware({
    src : './assets/scss',
    dest : './assets/css',
    debug : true,
    outputStyle : 'extended',
    prefix : '/css'
}));

// ----- Express Session Configuration ---- //
app.use(session({
    name : 'Easy-Buy',
    secret : 'secret',
    saveUninitialized : false,
    resave : true,
    cookie : {
        maxAge : (1000 * 60 * 100)
    },
    store: MongoStore.create({
        mongoUrl : db._connectionString,
        mongoOptions : {},
        useNewUrlParser: true
    })
}));

// ---- PassPort Middlewares ---- //
app.use(passport.initialize());
app.use(passport.session());
app.use(passport.setAuthenticatedUser);

// ---- Flash middleware ---- //
app.use(flash());
app.use(customMware.setFlash);


app.set('layout extractStyles',true);
app.set('layout extractScripts',true);


//Setting up the view Engine
app.set('view engine','ejs');
app.set('views',path.join(__dirname,'views'));




app.use('/', require('./routes'));


app.listen(port, (err) => {

    if(err){console.log(`Error in running port: ${err}`);}

    console.log("Running on Port : ",port);

})