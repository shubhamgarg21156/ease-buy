const Products = require('../models/Product');
const newsletter_mailer = require('../mailers/newsletter_mailer');
const contact_mailer = require('../mailers/contact_mailer');

module.exports.home = async (req,res) => {

    let newproducts = await Products.find({subcategory:"newproducts"});
    Products.find({},function(err,products){

        res.render('home',{
            title : 'Home Page',
            products: products,
            newproducts : newproducts,
            key: 'pk_test_51JOmPHSDqMOPiqRGxjtLYGKq595kkYuIFFyxbiIDeJiOtI8qzUkfoNbecKWFupkIXk2wPHddEqIWjpX86NLA2hSz00wA2eAIGO'
        });

    })
}

module.exports.subscribe = async (req,res) => {

    newsletter_mailer.newMail(req.body.email);
    req.flash('success','You have been subscribed to our newsletter');
    return res.redirect('back');
}

module.exports.message = (req,res) => {

    contact_mailer.newMail(req.body.email, req.body.name, req.body.message);
    req.flash('success','You Message has been sent');
    return res.redirect('back');

}





