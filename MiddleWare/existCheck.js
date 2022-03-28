const { getCollection } = require("../mongodb")

const existCheck = async (req,res,next) => {
    const { collection, client } = await getCollection("password");
    try {
        let document = await collection.findOne({ email: req.body.email });
        if (document) {
            res.status(403).send({
                success: false,
                message: "User already exists"
            });
        }
        else {
            next();
        }
    }
    catch (err) {
        res.status(500).send({
            success: false,
            message:"Internal server error"
        })
    }
}

const userPresent = async (req, res, next) => {
    const { collection, client } = await getCollection("password");
     try {
        let document = await collection.findOne({ email: req.body.email });
        if (document) {
            next();
        }
        else {
             res.status(403).send({
                 success: false,
                 message: "No user exists"
             });
        }
    }
    catch (err) {
        res.status(500).send({
            success: false,
            message:"Internal server error"
        })
    }
}

module.exports = { existCheck,userPresent };