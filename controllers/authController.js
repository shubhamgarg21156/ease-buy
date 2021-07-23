const User = require('../models/User');
const Cart = require('../models/Cart');
const passport = require('../config/passport-local-strategy');
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
            req.flash('error',"User already exists");
            console.log("User already exists");
            return res.redirect('back');
        }

        let user = await User.create(req.body);

        let cart = await  Cart.create({user : user});

        let finaluser = await User.findByIdAndUpdate(user._id,{cart:cart});
          
        console.log("User created");
        
        req.flash('success','Successfully Registered.. Now Login In');
        return res.redirect('back');
        
    })

}catch(err){

    console.log(`${err}`);

}
   
    
}

// ---- Logout Handle ---- //
module.exports.logout = (req,res) => {
    req.flash('error','You have been Logged Out');
    req.logout();
    return res.redirect('/');
}