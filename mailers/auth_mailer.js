const nodeMailer = require('../config/nodemailer');
const environment = require('../config/environment');

exports.sendMail = (email , string) => {
    nodeMailer.transporter.sendMail({
        from : 'gargshubham21156@gmail.com',
        to : email,
        subject : 'Verify Your Email to log in to Easy-Buy',
        html : `Press <a href="${environment.email_verification_url}${string}"> here </a> to verify your email.`
    } , function(err,info){
        if(err){
            console.log(`${err} , Error in sending verification email`);
            return;
        }
        else{
            console.log("Verification link sent");
            return;
        }
    });
}