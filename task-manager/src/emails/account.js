const sgMail = require('@sendgrid/mail');
const { model } = require('../models/task');

sgMail.setApiKey(process.env.SENDGRID_API_KEY);



const sendWelcomeEmail = (email, name) => {
    sgMail.send({
        to: email,
        from: 'shufflebyte@googlemail.com',
        subject: 'Welcome to my service',
        text: `Dear ${name}, welcome to my service.`,
        // html: "<br>some html doc</br>"
    });
};

const sendCancelationEmail = (email, name) => {
    sgMail.send({
        to: email,
        from: 'shufflebyte@googlemail.com',
        subject: 'Good Bye from my service',
        text: `Dear ${name}, bye from my service.`,
    });
};

module.exports =  {
    sendWelcomeEmail,
    sendCancelationEmail
};