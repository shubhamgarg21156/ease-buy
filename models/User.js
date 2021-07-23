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
          cart : {
            type:mongoose.Schema.Types.ObjectId,
            ref:'Cart',
          }
    
},{timestamps:true});

const User = mongoose.model('User', UserSchema);

module.exports = User;
