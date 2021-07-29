const Product = require('../models/Product');
const Category = require('../models/Category');

module.exports.admin = (req,res) => {
    res.render('admin');
}

module.exports.addtodb = (req,res) => {

    Product.create({
        name : req.body.name,
        image : req.body.image,
        zoomedimage : req.body.zoomedimage,
        description : req.body.description,
        price:req.body.price,
        category:req.body.category,
        saleprice : req.body.saleprice
    }, (err,product) => {
        if(err){
            req.flash('error','Some error occured');
            console.log('Some error occured');
            return res.redirect('back');
        }

        req.flash('success','Product added to database');
        console.log('Product added to database');
        return res.redirect('back');

        })
}