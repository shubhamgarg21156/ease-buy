const Product = require('../models/Product');
const Wishlist = require('../models/Wishlist');

module.exports.addtowishlist = async (req,res) => {


    Product.findOne({ _id : req.query.id } , (err,product) => {


        if(err){
            console.log("error in finding product while loading wishlist");
            req.flash('error',"Some error occured");
            return res.redirect('back');
        }

        if(!product.iswishlist){
        Wishlist.findByIdAndUpdate(req.user.wishlist, {$push : {products : product}} , async function(err,wishlist){
            if(err){
                console.log(`${err},Error in finding wishlist`);
                req.flash('error',"Some error occured");
                return res.redirect('back');
            }

            await Product.findByIdAndUpdate(req.query.id , {iswishlist : true});
            req.flash('success','Item added to wishlist');
            return res.redirect('back');
        })

    }
    else{

        Wishlist.findByIdAndUpdate(req.user.wishlist, {$pull: {products : {$in: [{_id : product._id}] }}} , async function(err,wishlist){
            if(err){
                console.log(`${err},Error in finding wishlist`);
                req.flash('error',"Some error occured");
                return res.redirect('back');
            }

            await Product.findByIdAndUpdate(req.query.id , {iswishlist : false});
            req.flash('success','Item removed from wishlist');
            return res.redirect('back');
        })

    }
    })
}