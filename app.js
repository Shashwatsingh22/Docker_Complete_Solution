var express = require("express")
var bodyParser = require("body-parser")
var mongoose = require("mongoose")
var jwt = require('jsonwebtoken');
var Projects = [];
var path = require('path');
var nodemailer = require('nodemailer');
var objectId = require('mongodb').ObjectID;
var assert = require('assert');
const bcrypt = require('bcrypt');
const app = express()
const User = require('./models/user');
const { render } = require("ejs");
const axios = require('axios');
const user = require("./models/user");
const loginS = require("./routes/login");
const optionS = require("./routes/option");
const signupS = require("./routes/sign_up");
const controlS = require("./routes/control");
const serverlessS = require("./routes/serverless");
const pullS = require("./routes/pull");
const imgser = require("./routes/img-ser");
const contser = require("./routes/cont-ser");
const netser = require("./routes/net-ser");
const imgbuildser = require("./routes/image_build");
const volser = require("./routes/vol_ser");
const configureS = require("./routes/configure");
const contoptionsS = require("./routes/contoptions");
app.use(bodyParser.json())
app.use(express.static('public'))
app.use(bodyParser.urlencoded({
    extended:true
}))
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
mongoose.connect('mongodb+srv://aditya_admin:'+ process.env.MONGO_DB_PASS + '@cluster0.aajkb.mongodb.net/DockerDB?retryWrites=true&w=majority',{
    useNewUrlParser: true,
    useUnifiedTopology: true
});
var db = mongoose.connection;
var mip;
var userN;
var wdata="";

db.on('error',()=>console.log("Error in Connecting to Database"));
db.once('open',()=>console.log("Connected to Database"))
app.get("/",(req,res)=>{
    res.set({
        "Allow-access-Allow-Origin": '*'
    })
    return res.redirect('./pages/index.html');
}).listen(8080);
app.use(configureS);
app.use(loginS);
app.use(signupS)
app.use(optionS)
app.use(controlS);
app.use(pullS);
app.use(serverlessS)
app.use(imgser);
app.use(contser);
app.use(imgbuildser);
app.use(volser);
app.use(netser);
app.use(contoptionsS)
//--> Image Service API's <----
// Container API service
  //-- Network Service ---
console.log("Listening on PORT 8080");