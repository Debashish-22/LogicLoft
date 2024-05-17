const nodemailer = require("nodemailer"); 

const mailer = async(receiverEmail, mailSubject, mailContent) => { 

    let mailSent = false;

    if(!receiverEmail)return mailSent;

    try { 
        // Create a transporter 
        let transporter = nodemailer.createTransport({ 
            service: process.env.NODEMAILER_SERVICE,
            host: process.env.NODEMAILER_HOST, 
            port: process.env.NODEMAILER_PORT, 
            secure: true,
            auth: { 
                user: process.env.NODEMAILER_USER, 
                pass: process.env.NODEMAILER_PASS, 
            }, 
        }); 

        // send mail with defined transport object 
        let mail = await transporter.sendMail({ 
            from: process.env.NODEMAILER_USER, // sender address 
            to: receiverEmail, // list of receivers 
            subject: mailSubject, 
            html: mailContent,
        });

        mailSent = mail.messageId ? true : false;
        
        return mailSent;

    } catch (error) { 
        return mailSent;
    } 
}; 

module.exports = mailer;