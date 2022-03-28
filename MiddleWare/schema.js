const schemaValidate = async (req, res, next) => {
    const password = req.body.password;
    const email = req.body.email;
    if ((email && email.length)){
        next();
    }
    else {
        res.status(403).send({
            success: false,
            message:"Email not present"
        })
    }
}

module.exports = {
    schemaValidate
}