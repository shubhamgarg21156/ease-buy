const User = require('../models/User');
const Cart = require('../models/Cart');
const Wishlist = require('../models/Wishlist');
const passport = require('../config/passport-local-strategy');
const authMailer = require('../mailers/auth_mailer');

// Funciton to create Creating random String to verify email //
const randString = () => {
    const len = 8;
    let randStr = ''
    for(let i=0;i<len;i++){
        const ch = Math.floor((Math.random() * 10 ) + 1);
        randStr +=ch;
    }
    return randStr;
}

// ---- Login Page Handle ---- //
module.exports.login = (req,res) => {
    if(req.isAuthenticated()){
        return res.redirect('/');
    }
    res.render('login',{
        title : 'Login'
    });
}

// ---- Login and Creating Session ---- //
module.exports.createSession = (req,res) => {
    req.flash('success', 'Logged In Successfully');
    res.redirect('/');
}


// ----- Creating the user ----- //
module.exports.create = async (req,res) => {
 
    const{name , email, password} = req.body;

    if(password.length<8){
        req.flash('error','Password must be atleast 8 characters long. Please Register again');
        console.log("Password is short");
        return res.redirect('back');
    }
    
try{

    User.findOne({email : email} , async  (err,olduser) => {
      
        if(err){console.log(`${err},Error in finding the user while signing up`);return res.redirect('back')};

        if(olduser){
            if(olduser.verified){
                req.flash('error',"User already exists..Please Login");
                console.log("User already exists");
                return res.redirect('back');
            }
            else{
                req.flash('success','Please Verify your Email');
                return res.redirect('back');
            }
        }

        let user = await User.create(req.body);

        let cart = await  Cart.create({user : user});

        let wishlist = await Wishlist.create({user : user});

        let randomString = await randString();

        let finaluser = await User.findByIdAndUpdate(user._id,{cart:cart, randomString : randomString , wishlist : wishlist});


        await authMailer.sendMail(email , randomString);
          
        req.flash('success','A Verification link has been sent to your mail');
        console.log("User created");
        
        return res.redirect('back');
        
    })

}catch(err){

    console.log(`${err}`);

}
}


//----- Verifying the Email -----//
module.exports.verifyemail = async (req,res) => {

    const {uniqueString} = req.params;

    const user = await User.findOne({randomString : uniqueString});

    if(user){
        user.verified = true;
        await user.save();

        req.flash('success','Email has been verified');

        res.json('Your account has been verified..');
    }
    else{
        res.json("User not found");
    }
}


// ---- Logout Handle ---- //
module.exports.logout = (req,res) => {
    req.flash('error','You have been Logged Out');
    req.logout();
    return res.redirect('/');
}