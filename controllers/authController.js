const User = require('../models/User');

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
    res.redirect('/');
}


// ----- Creating the user ----- //
module.exports.create = (req,res) => {
 
    console.log(req.body);
    const{name , email, password} = req.body;


    if(password.length<8){
        res.redirect('back');
    }
    

    User.findOne({email : email} , (err,user) => {
      
        if(err){console.log(`${err},Error in finding the user while signing up`);return res.redirect('back')};

        if(user){
            res.redirect('back');
        }

        User.create(req.body, function(err,user){
            if(err){console.log(`${err} Error in creating the  user`)};

            console.log("User created");
            return res.redirect('/auth/login');
        })
    })
    
}

// ---- Logout Handle ---- //
module.exports.logout = (req,res) => {
    req.logout();
    return res.redirect('/');
}