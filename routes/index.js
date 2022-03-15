var express = require('express');
var router = express.Router();
const { getCollection } = require("../mongodb");
const { existCheck } = require("../MiddleWare/existCheck");
const { registerUser } = require("../MiddleWare/authentication");
const { schemaValidate } = require("../MiddleWare/schema");

router.get('/',async function (req, res, next) {
  const { collection,client } =await getCollection("password");
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


router.put("/changePassword",[userPresent],async (req, res) => {
  const { collection, client } = getCollection("password");
  const { email, password } = req.body;
  try {
    
  }
  catch (err) {
    
  }
  finally {
    client.close();
  }
})

module.exports = router;
