const mongoose = require('mongoose');

const CategorySchema = new mongoose.Schema({
        name: {
            type : String,
            required:true
        },
        prod:[
                {
                    type : mongoose.Schema.Types.ObjectId,
                    ref : 'Product',
                    default : []
                }
            ]
             
},{timestamps:true});

const Category = mongoose.model('Category', CategorySchema);

module.exports = Category;