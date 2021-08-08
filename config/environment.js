const development = {
    google_callbackURL: 'http://localhost:8000/auth/google/callback',
    facebook_callbackURL: "http://localhost:8000/auth/facebook/callback/",
    email_verification_url : 'http://localhost:8000/auth/verify/'

}

const production = {
    google_callbackURL: 'https://ease-buy.herokuapp.com/auth/google/callback',
    facebook_callbackURL: "https://ease-buy.herokuapp.com/auth/facebook/callback/",
    email_verification_url : 'https://ease-buy.herokuapp.com/auth/verify/'
}

module.exports = eval(process.env.NODE_ENV) == undefined ? development : production;