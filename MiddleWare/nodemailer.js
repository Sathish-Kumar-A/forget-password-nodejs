require("dotenv").config();
const { Email, Pass } = process.env;
const randomToken = require("random-token");
const nodemailer = require("nodemailer");
const { createJWTToken } = require("./JWT");

const sendMailNode = async (req, res, next) => {
    const { email } = req.body;
    let token = await createJWTToken(email);
    res.locals.token = token;
    var transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
            user: Email,
            pass:Pass
        }
    });

    var mailOptions = {
        from: Email,
        to: email,
        subject: 'Change Password',
        html: `The token to change password is <b>${token}</b>`
    }

   transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.log("error", error);
            res.status(500).send({
                success: false,
                message:"Mail sending failed/ server error"
            })
        }
        else {
            console.log("Email sent", info.response);
            next();
        }
    });
    
}

const generateRandomString = () => {
    var token = randomToken(10);
    return token;

}
module.exports = { sendMailNode,generateRandomString };