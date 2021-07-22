const mongoose = require('mongoose');

mongoose.connect(`mongodb+srv://Shubham:${process.env.mongo_password}@cluster0.w4jfn.mongodb.net/easybuy_production?retryWrites=true&w=majority`);

const db = mongoose.connection;

// ----- On Error ---- //
db.on('error',console.error.bind(console,'connection error'));

// ----- On Connection ----- //
db.once('open',() => {
    console.log('connected');
});

module.exports = db;