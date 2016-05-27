var nodemailer,
	Q;

//modules
nodemailer = require('nodemailer');
Q          = require('q');

function emailController () {

	var self = this;

	this.configTransport = {
		service : 'Gmail',
		auth: {
	        user: 'miguel87831@gmail.com', // Your email id
	        pass: 'dxhwvdmvfbjuzcgc' // Your password
	    }
	} 

	this.sendEmail = function(user) {
		var transporter,
			text,
			mailOptions,
			deferred;

		deferred = Q.defer();

		transporter = nodemailer.createTransport(self.configTransport);

		html = '<p>Dear <b>' + user.userName + '</b>, You are receiving this because you (or someone else) have requested the reset of the password for your account.\n\n' +
          'Please click on the following link, or paste this into your browser to complete the process:</p>' +
          '<br><b>http://localhost:8000/reset/' + user.resetPasswordToken +'</b>' +
          '<p>If you did not request this, please ignore this email and your password will remain unchanged.</p>';

	    mailOptions = {
		    from: 'miguel87831@gmail.com', // sender address
		    to: user.email, // list of receivers
		    subject: 'Reset password', // Subject line
		    //text: text //, // plaintext body
		    html: html // You can choose to send an HTML body instead
		};

		transporter.sendMail(mailOptions, function(err, info) {
		    if(err) {
		        console.log(err);
		        deferred.reject(err);
		    }else {
		        console.log('Message sent: ' + info.response);
		        deferred.resolve(info);
		    };
		});

		return deferred.promise; 
	}

	return this;
}

module.exports = new emailController();