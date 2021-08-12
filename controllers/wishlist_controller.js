

module.exports.wishlist = (req,res) => {
    
    // wishlist.find({user : req.user._id}).populate({
    //     path : 'orders',
    //     populate : {
    //         path : 'product'
    //     }
    // }).exec(async function(err,cart)
    // {
    //     res.render('wishlist',{
    //         title : 'wishlist',
           
    //     });
    //  });


    res.render('wishlist',{
            title : 'wishlist',
        });
}
