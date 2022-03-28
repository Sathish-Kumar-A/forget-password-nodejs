const randomToken = require("random-token");
const nodemailer = require("nodemailer");

const sendMailNode = async(email,token) => {
    var transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
            user: "sathish252199@gmail.com",
            pass:"Sathish@25"
        }
    });

    var mailOptions = {
        from: 'sathish252199@gmail.com',
        to: email,
        subject: 'Change Password',
        html: `The token to change password is <b>${token}</b>`
    }

   transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.log("error", error);
            return { success: false, message: "Mail sending failed" };
        }
        else {
            console.log("Email sent", info.response)
            return { success: true, message: "Mail sent Successfully" };
        }
    });
    
}

const generateRandomString = () => {
    var token = randomToken(10);
    return token;

}
module.exports = { sendMailNode,generateRandomString };