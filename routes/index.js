var express = require('express');
var router = express.Router();
var nodemailer = require('nodemailer'); 
var mailCred = require('../config/keys_mail.js');

// create reusable transporter object using the default SMTP transport
let transporter = nodemailer.createTransport({
	service: "Godaddy",
	host: "smtpout.secureserver.net",
    port: 587,
	secure: false,
    auth: {
        user: mailCred.email, // 
        pass: mailCred.password  // 
    },
    debug: true,
    connectionTimeout: 6000,
    greetingTimeout: 6000,
    socketTimeout: 6000
});

// setup email data with unicode symbols
let mailOptions = {
    from: 'hello@digitalbluefoam.com', // sender address
    to: 'janice@designknus.com', // list of receivers
    subject: '', // Subject line
    text: '', // plain text body
};


/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Coming Soon' });
});

router.post('/', function(req, res, next) {
	var name = req.body.name;
	var email = req.body.email;
	var subject = req.body.subject;
	var message = req.body.message;
	mailOptions.subject = subject;
	mailOptions.text = message + '\n\n' + name;
	mailOptions.replyTo = email;
	// send mail with defined transport object
    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.error(error);
            next(error);
        } else {
        	res.send(info);
        }

    });

});

module.exports = router;
