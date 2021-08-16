

var Publishable_Key = 'pk_test_51JOmPHSDqMOPiqRGxjtLYGKq595kkYuIFFyxbiIDeJiOtI8qzUkfoNbecKWFupkIXk2wPHddEqIWjpX86NLA2hSz00wA2eAIGO'
var Secret_Key = 'sk_test_51JOmPHSDqMOPiqRGA7ot0HEKqJxHsh9XssZFjd141U3f5YcUSp7IGIeFYc1Y3gkDLSj3WKjdGVSuJ6KIpiBzH3BD00eCEKk9CC'

const stripe = require('stripe')(sk_test_51JOmPHSDqMOPiqRGA7ot0HEKqJxHsh9XssZFjd141U3f5YcUSp7IGIeFYc1Y3gkDLSj3WKjdGVSuJ6KIpiBzH3BD00eCEKk9CC) 



app.use(bodyparser.urlencoded({extended:false})) 
app.use(bodyparser.json()) 

// View Engine Setup 
// app.set('views', path.join(__dirname, 'views')) 
// app.set('view engine', 'ejs') 

// app.get('/', function(req, res){ 
//     res.render('Home', { 
//     key: Publishable_Key 
//     }) 
// }) 

app.post('/payment', function(req, res){ 

    // Moreover you can take more details from user 
    // like Address, Name, etc from form 
    stripe.customers.create({ 
        email: req.body.stripeEmail, 
        source: req.body.stripeToken, 
        name: 'req.body.name', 
        address: { 
            line1: 'TC 9/4 Old MES colony', 
            postal_code: '110092', 
            city: 'New Delhi', 
            state: 'Delhi', 
            country: 'India', 
        } 
    }) 
    .then((customer) => { 

        return stripe.charges.create({ 
            amount: 80000,    // Charing Rs 25 
            description: 'product', 
            currency: 'INR', 
            customer: customer.id 
        }); 
    }) 
    .then((charge) => { 
        
        res.send("Payment done Successfully") // If no error occurs 
    }) 
    .catch((err) => { 
        res.send(err)    // If some error occurs 
    }); 
}) 