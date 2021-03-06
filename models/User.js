const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
          name: {
            type: String,
            required: true
          },
          email: {
            type: String,
            required: true
          },
          password: {
            type: String,
            required: true
          },
          verified: {
            type: Boolean,
            default: false
          },
          resetLink: {
            type: String,
            default: ''
          },
          randomString : {
            type:String,
          },
          cart : {
            type:mongoose.Schema.Types.ObjectId,
            ref:'Cart',
          },
          wishlist : {
            type:mongoose.Schema.Types.ObjectId,
            ref:'Wishlist',
          }
    
},{timestamps:true});

const User = mongoose.model('User', UserSchema);

module.exports = User;
