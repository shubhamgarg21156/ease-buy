const express = require('express');
const app = express();
const port = process.env.PORT || 8000;
const path = require('path');
const expressLayouts = require('express-ejs-layouts');
const sassMiddleware = require('node-sass-middleware');

app.use(express.static('./assets'));
app.use(expressLayouts);


app.use(sassMiddleware({
    src : './assets/scss',
    dest : './assets/css',
    debug : true,
    outputStyle : 'extended',
    prefix : '/css'
}));



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