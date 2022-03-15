const schemaValidate = async (req, res, next) => {
    const password = req.body.password;
    const email = req.body.email;
    if ((password && password.length) && (email && email.length)){
        next();
    }
    else {
        res.status(403).send({
            success: false,
            message:"Email or password length error"
        })
    }
}

module.exports = {
    schemaValidate
}