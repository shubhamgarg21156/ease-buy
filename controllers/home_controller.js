const Products = require('../models/Product');

module.exports.home = (req,res) => {

    Products.find({},function(err,products){

        res.render('home',{
            title : 'Home Page',
            products: products
        });

    })
}






