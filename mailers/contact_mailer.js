const nodeMailer = require('../config/nodemailer');

exports.newMail = (email,name,message) => {
    let htmlString = nodeMailer.renderTemplate({email : email, name:name, message : message} , '/contact_mail.ejs');
    nodeMailer.transporter.sendMail({
        from : 'gargshubham21156@gmail.com',
        to: 'gargshubham21156@gmail.com',
        subject : "Easy-Buy New Customer Message",
        html : htmlString
    })
}