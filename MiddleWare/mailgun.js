const mailgun = require("mailgun-js");
const api_key = "f4d8285e09b01b27f0dd54de8b292d13-fe066263-0402f579"
const DOMAIN = 'https://app.mailgun.com/app/sending/domains/sandbox3469213540674c1488e3e1c044c91de3.mailgun.org';
const mg = mailgun({
    apiKey: api_key,
    domain: DOMAIN
});
const data = {
    from: 'sp733172@gmail.com',
    to: 'sathish252199@gmail,com',
    subject: 'Hello',
    text: 'Testing some Mailgun awesomness!'
};

mg.messages().send(data, function (error, body) {
    if (error) {
        console.log("error", error);
    }
    else {
        console.log("Email sent",body);
    }
});