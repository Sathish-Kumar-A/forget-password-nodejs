const JWT = require("jsonwebtoken");
const JWTD = require("jwt-decode");
const { getCollection } = require("../mongodb");
const secretKey="SathishKumar"

const createJWTToken = async (email) => {
    return await JWT.sign({ email }, secretKey, {
        expiresIn:"5m"
    })
}
const authenticateToken = async (req, res, next) => {
    const { token } = req.body;
    const decode = JWTD(token);
    const currentTimeInMicroSec = Math.round(new Date() / 1000);
    if (currentTimeInMicroSec <= decode.exp) {
        next();
    } else {
        res.status(401).send({
            success: false,
            message: "Token Expired"
        })
    }

}
const validateToken = async (req, res, next) => {
    const { client, collection } = await getCollection("password");
    try {
        const { token } = req.body;
        let document = await collection.findOne({ token: token });
        if (document) {
            next();
        }
        else {
            res.status(401).send({
                success: false,
                message:"Invalid Token"
            })
        }
    } catch (error) {
        res.status(404).send({
            success:false,
            message:"Error Occured"
        })
    }
    finally {
        client.close();
    }
}

module.exports = { createJWTToken, validateToken,authenticateToken };