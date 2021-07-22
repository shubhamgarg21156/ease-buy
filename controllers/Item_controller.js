const Product = require('../models/Product');
const Order= require('../models/Order');

module.exports.makeOrder = (req,res) => {

    const product_id = req.body.id;

    Product.findById(product_id,(err,product) => {

        if(product){

            Order.create({
                product : req.body.
            })

        }

    })

}