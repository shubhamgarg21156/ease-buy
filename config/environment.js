const development = {
    google_callbackURL: 'http://localhost:8000/auth/google/callback',
    facebook_callbackURL: "http://localhost:8000/auth/facebook/callback/"

}

const production = {
    google_callbackURL: 'https://ease-buy.herokuapp.com/auth/google/callback',
    facebook_callbackURL: "https://ease-buy.herokuapp.com/auth/facebook/callback/"
}

module.exports = eval(process.env.NODE_ENV) == undefined ? development : production;