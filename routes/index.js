var express = require('express');
var router = express.Router();
const { getCollection } = require("../mongodb");
const { existCheck,userPresent } = require("../MiddleWare/existCheck");
const { registerUser,authenticateUser } = require("../MiddleWare/authentication");
const { schemaValidate } = require("../MiddleWare/schema");
const { sendMailNode, generateRandomString } = require("../MiddleWare/nodemailer");
const { createJWTToken, validateToken,authenticateToken } = require("../MiddleWare/JWT");

router.get('/',async function (req, res, next) {
  const { collection, client } = await getCollection("password");
  const { email } = req.body;
  try {
    let document = await collection.find().toArray();
    res.send(document);
  }
  catch (err) {
    console.log(err);
    res.send({
      message:err
    })
  }
  finally {
    client.close();
  }
});

router.get("/login", async (req, res) => {
  const { email, password } = req.body;
  const { collection, client } = await getCollection("password");
  try {
    let user = await collection.find({ email: email }).toArray();
    console.log(user)
    if (user) {
      let correctPassword =await authenticateUser(password, user[0].password);
      console.log(correctPassword);
      if (correctPassword) {
        res.status(200).send({
          success: true,
          message:"Logined successfully"
        })
      }
      else {
        res.status(401).send({
          message: "Incorrect password",
          success: false
        });
      }
    }
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message:'Internal server error'
    })
  }
  finally {
    client.close();
  }
})

router.post("/register", [schemaValidate, existCheck], async (req, res) => {
  const { collection, client } = await getCollection("password");
  const password = req.body.password;
  const email = req.body.email;
  const hash = await registerUser(password);
  try {
    await collection.insertOne({ email: email, password: hash });
    res.status(200).send("User added successfully");
  }
  catch (err) {
    console.log(err);
    res.status(500).send({
      message: err
    })
  }
  finally {
    client.close();
  }
});


router.put("/sendmail", [userPresent], async (req, res) => {
  const { collection, client } = await getCollection("password");
  const { email } = req.body;
  try {
    let token = await createJWTToken(email);
    await sendMailNode(email, token);
    await collection.updateOne({ email: email }, { $set: { token: token } });
    res.status(200).send({
      success: true,
      message: "Mail sent successfully"
    });
  }
  catch (err) {
    console.log(err);
    res.status(404).send({
      message: "Message sending failed"
    })
  }
  finally {
    client.close();
  }
});

router.put("/entertoken",[validateToken,authenticateToken], async (req, res) => {
  try {
    res.status(200).send({
      success: true,
      message:'Enter the new password'
    })
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message:"Internal server error"
    })
  }
})

router.put("/changepassword", async (req, res) => {
  const { email, password } = req.body;
  const hash = await registerUser(password);
  console.log(hash);
  const { collection, client } = await getCollection("password");
  try {
    await collection.findOneAndUpdate({ email }, { $set: { password: hash } });
    res.status(200).send({
      success: true,
      message:"Password changed successfully"
    })
  } catch (error) {
    res.status(500).send({
      success: false,
      message:"Internal server error"
    })
  }
  finally {
    client.close();
  }
})
module.exports = router;
