  // SocialApp
  const express = require('express');
  const bodyParser = require("body-parser")
  const swaggerJsdoc = require("swagger-jsdoc")
  const swaggerUi = require("swagger-ui-express")
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
  const fs = require('fs');
  const port = process.env.PORT || 1077;
  dotenv.config();
  // SocialApp
  // Admin
  //const app = express();
  global.app = express(); 
  global.moment = require('moment');
  const expressValidator = require('express-validator');
  const fileUpload = require('express-fileupload');
  const cors = require('cors');
  var apiRouter = require('./routes/api');
  global.connectPool = require('./config/db.js'); 
  global.nodeSiteUrl = 'http://127.0.0.1:1077'; // node  
  global.nodeAdminUrl = 'http://127.0.0.1:1077/admin'; // node  
  global.siteTitle = 'TWON Admin';
  global.successStatus = 200;
  global.failStatus = 401; 
  global.SessionExpireStatus = 500;  
  global.CURRENCY = '$'; 
  var flash = require('express-flash-messages') 
  var cookieParser = require('cookie-parser');
  var expressSession = require('express-session');
  // Admin
  //Swagger
  const options = {
    definition: { openapi: "3.1.0",
      info: {
        title: "Basic social app - Express APIs with Swagger", version: "0.1.0", description: "", },
    },
    apis: ["./routes/*.js"],
  };
  const specs = swaggerJsdoc(options);
  //Swagger





  //import { createProxyMiddleware } from 'http-proxy-middleware'

  // Admin

  // Admin

  //app.use(express.json());
  /*
  MONGODB_URI = "mongodb+srv://abdulsittar72:2106010991As@cluster0.gsnbbwq.mongodb.net/?retryWrites=true&w=majority"

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

  //app.use(morgan('common'));

  //const dirnameExportImg = path.join(__dirname, '../client/build')

  /*fs.readdir(dirnameExportImg, function (err, files) {
    if (err) {
      console.log(err)
    }
    files.map(
      (file) => { console.log(file) }
    )
  })*/

  //app.use(bodyParser.json());

  //app.use(helmet({
  //  contentSecurityPolicy: false,
  //}));

  // SocialApp
  app.use(express.static('dist'));
  app.use('/users', userRoute);
  app.use('/auth',  authRoute);
  app.use('/posts', postRoute);
  app.use('/conversations', conversationRoute);
  app.use('/messages', messageRoute);
  app.use('/users', apiRouter);  

  app._router.stack.forEach(function(r){
    if (r.route && r.route.path){
      console.log(r.route.path)
    }
  })
  
  // Serve frontend
  if (process.env.NODE_ENV === 'production') {
    console.log("Production!");
  
    app.use(express.static(path.join(__dirname, '../client/build')));
    app.get('/', function (req, res) {
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

  // SocialApp

  // Swagger
  app.use( "/api-docs", swaggerUi.serve, swaggerUi.setup(specs, { explorer: true, customCssUrl: "https://cdn.jsdelivr.net/npm/swagger-ui-themes@3.0.0/themes/3.x/theme-newspaper.css",}));
  // Swagger

  // Admin
  app.use(expressValidator());
  app.use(cors()); 
  app.use(fileUpload()); 
  app.use(bodyParser.urlencoded({ extended: true }));
  app.set('view engine', 'ejs');  
  app.set('views', path.join(__dirname, 'views'));  
  app.use(express.static(path.join(__dirname  +'/public')));
  app.use(express.static(__dirname +'/public')); 
  app.use(flash())
  app.use(cookieParser()); 
  app.use(expressSession({secret: 'D%$*&^lk32', resave: false,saveUninitialized: true})); 
  app.use(function (req, res, next) {res.header('Content-Type', 'application/json');  next();});   
  app.use(bodyParser.json());  
  app.use(express.urlencoded({limit: '100mb',extended: true }));
  app.get('/text/', (req, res) => {
    res.json({"message": "Welcome to EasyNotes application. Take notes quickly. Organize and keep track of all your notes."});
  });
  app.use('/admin/', apiRouter);   


  // Admin

  // using multer to upload files
  /*const storage = multer.diskStorage({
      destination: (req, file, cb) => {
        cb(null, "public/images");
      },
      filename: (req, file, cb) => {
        cb(null, req.body.name);
      },
    });
    
    const upload = multer({ storage: storage });*/
    /*app.post("/api/upload", upload.single("file"), (req, res) => {
      try {
        return res.status(200).json("File uploaded successfully");
      } catch (error) {
        console.error(error);
      }
    });*/

  //app.use(express.static(path.join(__dirname, 'public/images')));

  app.listen(port, () => console.log(`Server started on port ${port}`));
  // Admin
  //var server = app.listen(1077, function () { 
  //  console.log("Example app listening at http://127.0.0.1:%s", server.address().port);
  //});       

  process.on('uncaughtException', function (err) { 
    console.log('Caught exception: ' + err);
  }); 

  //admin



