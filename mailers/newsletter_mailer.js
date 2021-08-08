const nodeMailer = require('../config/nodemailer');

exports.newMail = (email) => {
    let htmlString = nodeMailer.renderTemplate({} , '/newsletter.ejs');
    nodeMailer.transporter.sendMail({
        from : 'gargshubham21156@gmail.com',
        to: email,
        subject : "Subscribed to Easy-Buy Newsletter",
        html : htmlString
    })
}