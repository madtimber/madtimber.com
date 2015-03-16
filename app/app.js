
var express = require("express");
var bodyParser = require('body-parser');
var logger = require('morgan');
var errorHandler = require('errorhandler');
var nodemailer = require('nodemailer');
var sendmailTransport = require('nodemailer-sendmail-transport');

var app = express();
app.use(logger('dev'));
app.use(bodyParser());

var mailTransporter = nodemailer.createTransport(sendmailTransport());

/**
 * This route handles the contact form.
 *
 * We proxy to '/' from '/contact' within the Nginx Config
 */
app.post('/', function(req, res) {
  // get form params
  // send the email
  console.log(req.body);

  console.log(mailTransporter);

  mailTransporter.sendMail({
    from: req.body.email,
    to: 'todd@madtimber.com',
    subject: 'Madtimber Contact Form: ' + req.body.name,
    text: req.body.message
  }, function(err, info) {
    console.log(err);
    console.log(info);
  });

  res.writeHead(200, {'Content-Type': 'text/plain'});
  res.end('sent.\n');
});

app.get('/', function(req, res) {
  res.writeHead(405, {
    'Content-Type': 'text/plain',
    'Allow': 'POST'
  });
  res.end('Use POST instead.\n');
});

app.use(function (req, res) {
  res.status(404).end();
});

if (app.get('env') === 'development') {
  app.use(errorHandler());
}

app.listen(3000);