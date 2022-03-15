const mongodb = require('mongodb');
const mongodbClient = mongodb.MongoClient;
const db_name = "auth";
const db_url = "mongodb+srv://sathishkumar:sathish25@cluster0.mkek8.mongodb.net/";


const getCollection = async (collectionName) => {
    const client = await mongodbClient.connect(db_url);
    const db = await client.db(db_name);
    const collection = await db.collection(collectionName);
    return { collection: collection, client: client };
}


module.exports = { mongodb, getCollection };