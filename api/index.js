const express = require('express');
const bodyParser = require("body-parser")
const swaggerJsdoc = require("swagger-jsdoc")
const swaggerUi = require("swagger-ui-express")
const app = express();
const mongoose = require('mongoose');
const { MongoClient, ServerApiVersion } = require('mongodb');
const dotenv = require('dotenv');
const helmet = require('helmet');
const morgan = require('morgan');
const multer = require("multer");
const userRoute = require('./routes/users');
const authRoute = require('./routes/auth');
const postRoute = require('./routes/posts');
const conversationRoute = require('./routes/conversations');
const messageRoute = require('./routes/messages');
const path = require('path');
app.use(express.static('dist'))
const fs = require('fs');
const port = process.env.PORT || 1077;
//import { createProxyMiddleware } from 'http-proxy-middleware'

dotenv.config();


app.use(bodyParser.urlencoded({ extended: true }));

//app.use(express.json());

MONGODB_URI = "mongodb+srv://abdulsittar72:2106010991As@cluster0.gsnbbwq.mongodb.net/?retryWrites=true&w=majority"

mongoose.connect(MONGODB_URI, 
    {useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: true })   
   .then(() => console.log("Database connected!"))
   .catch(err => console.log(err));

const dirnameExportImg = path.join(__dirname, '../client/build')

fs.readdir(dirnameExportImg, function (err, files) {
  if (err) {
    console.log(err)
  }
  files.map(
    (file) => { console.log(file) }
  )
})

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


//app.use(morgan('common'));

app.use(bodyParser.json());

//app.use(helmet({
//  contentSecurityPolicy: false,
//}));

  // routes
app.use('/users', userRoute);
app.use('/auth',  authRoute);
app.use('/posts', postRoute);
app.use('/conversations', conversationRoute);
app.use('/messages', messageRoute);

// using multer to upload files
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, "public/images");
    },
    filename: (req, file, cb) => {
      cb(null, req.body.name);
    },
  });
  
  const upload = multer({ storage: storage });
  /*app.post("/api/upload", upload.single("file"), (req, res) => {
    try {
      return res.status(200).json("File uploaded successfully");
    } catch (error) {
      console.error(error);
    }
  });*/

  app.use(express.static(path.join(__dirname, 'public/images')));

// Serve frontend
 if (process.env.NODE_ENV === 'production') {
	console.log("Production!");
 
	app.use(express.static(path.join(__dirname, '../client/build')));
	app.get('/*', function (req, res) {
   res.sendFile(
      path.resolve(__dirname, '../', 'client', 'build', 'index.html')
    )}
  );
  app.get('/', (req, res) => res.send('DONE'));
  
} else {

  app.use(express.static(path.join(__dirname, '../client/build')));
  app.get('/', (req, res) => res.send('Please set to production'));
  console.log("Development!");

}

const options = {
  definition: {
    openapi: "3.1.0",
    info: {
      title: "Basic social app - Express APIs with Swagger",
      version: "0.1.0",
      description:
        "",
    },
  },
  apis: ["./routes/*.js"],
};


const specs = swaggerJsdoc(options);
app.use(
  "/api-docs",
  swaggerUi.serve,
  swaggerUi.setup(specs, { explorer: true, customCssUrl:
    "https://cdn.jsdelivr.net/npm/swagger-ui-themes@3.0.0/themes/3.x/theme-newspaper.css",
})
);







app.listen(port, () => console.log(`Server started on port ${port}`));