const { MongoClient, ServerApiVersion } = require('mongodb');
const uri = process.env.MONGODB_URI_CR;
// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

export const ConnectOne = (collection) => {
  const database = process.env.MONGODB_CR
  return client.db(database).collection(collection);
};

