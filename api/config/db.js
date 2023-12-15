const mongoose = require('mongoose');
require('dotenv').config()
const { MongoClient, ServerApiVersion } = require('mongodb');
console.log(process.env.DB_URL)
mongoose.Promise = global.Promise;
global.url =  process.env.DB_URL;
// Connecting to the database
mongoose.connect(url, {
    useNewUrlParser: true
}).then(() => {
    console.log("Successfully connected to the database");    
}).catch(err => {
    console.log('Could not connect to the database. Exiting now...', err);
    process.exit();
    
});

/*MONGODB_URI = "mongodb+srv://abdulsittar72:2106010991As@cluster0.gsnbbwq.mongodb.net/?retryWrites=true&w=majority"

mongoose.connect(MONGODB_URI, 
    {useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: true })   
   .then(() => console.log("Database connected!"))
   .catch(err => console.log(err));

const uri = "mongodb+srv://abdulsittar72:2106010991As12@cluster0.gsnbbwq.mongodb.net/?retryWrites=true&w=majority";
// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(MONGODB_URI, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    await client.connect();
    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
    //mongoose.connection.collections.dropAllUsers();
    // mongoose.db.dropAllUsers();
  } finally {
	  console.log("Pinged your deployment. You successfully connected to MongoDB!");
    // Ensures that the client will close when you finish/error
    await client.close();
  }
}
run().catch(console.dir);
*/