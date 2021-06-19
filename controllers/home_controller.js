
module.exports.home = (req,res) => {
    res.render('home',{
        title : 'Home Page'
    });
}

module.exports.login = (req,res) => {
    res.render('login',{
        title : 'Login'
    });
}


