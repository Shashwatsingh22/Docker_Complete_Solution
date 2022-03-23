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


app.post("/configure", (req, res, next) => {
    User.find({ username: req.body.username })
      .exec()
      .then(user => {
        if (user.length >= 1) {
          console.log('Username exists');
        } else {
          bcrypt.hash(req.body.password, 10, (err, hash) => {
            if (err) {
              console.log('Error')
            } else {
              const user = new User({
                _id: new mongoose.Types.ObjectId(),
                username: req.body.username,
                password: hash
              });
              user
              .save()
              .then(result => {
                console.log(result);
                
              })
              .catch(err => {
                console.log(err);
              })
              if(req.body.email==="admin@gmail.com"){
                res.redirect('data.ejs')
              }
              else{      
                User.find({email: req.body.email})
                .select(" email ")
                .exec()
                .then(docs => {
                  const response = {
                    
                    users: docs.map(doc => {
                      return {
                        
                        email: doc.email
                        
                      };
                    })
                  };
                  userN=req.body.email;
                  res.render('option', { title: 'Developer Records', user: userN,})
                })
              
        }
     
            }
    // db.collection('users').insertOne(user,(err,collection)=>{
    //     if(err){
    //         throw err;
    //     }
    //     console.log("Record Inserted Successfully");
    // });

    // return res.redirect('signup_success.html');
});
}});
});

app.post("/sign_up", (req, res, next) => {
  User.find({ email: req.body.email })
    .exec()
    .then(user => {
      if (user.length >= 1) {
        console.log('Mail exists');
      } else {
        bcrypt.hash(req.body.password, 10, (err, hash) => {
          if (err) {
            console.log('Error')
          } else {
            const user = new User({
              _id: new mongoose.Types.ObjectId(),
              username: req.body.username,
              email: req.body.email,
              password: hash
            });
            user
            .save()
            .then(result => {
              console.log(result);
            })
            .catch(err => {
              console.log(err);
            })
            userN=req.body.username;
            res.render('option', { title: 'Developer Records', user: userN})
            
      }
   
      
  // db.collection('users').insertOne(user,(err,collection)=>{
  //     if(err){
  //         throw err;
  //     }
  //     console.log("Record Inserted Successfully");
  // });

  // return res.redirect('signup_success.html');
});
}});
});
app.get("/login", (req, res) => {
  res.set({
      "Allow-access-Allow-Origin": '*'
  })
  return res.redirect('/pages/login.html');
})
app.get("/sign_up", (req, res) => {
  res.set({
      "Allow-access-Allow-Origin": '*'
  })
  return res.redirect('/pages/signup.html');
})
app.get("/signup_success", (req, res) => {
  res.set({
      "Allow-access-Allow-Origin": '*'
  })
  return res.redirect('/pages/signupsuccess.html');
})
app.get("/option", (req, res) => {
  res.set({
      "Allow-access-Allow-Origin": '*'
  })
  return res.redirect('option.ejs');
})
app.get("/control", (req, res) => {
  res.set({
      "Allow-access-Allow-Origin": '*'
  })
  res.render('control.ejs');
})
app.get("/owned", (req, res) => {
  res.set({
      "Allow-access-Allow-Origin": '*'
  })
  return res.redirect('owned.ejs');
})
app.get("/pull", (req, res) => {
  res.set({
      "Allow-access-Allow-Origin": '*'
  })
  res.render('pull.ejs',{mip: mip, userN: userN});
})
app.get("/serverless", (req, res) => {
  res.set({
      "Allow-access-Allow-Origin": '*'
  })
  res.render('serverless.ejs');
})
app.post("/serverless", (req, res) => {
  res.render('serverless.ejs',{});
})

app.get("/img-ser", (req, res) => {
  res.set({
      "Allow-access-Allow-Origin": '*'
  })
  return res.render('img.ejs',{
    mip : mip,
    userN : userN,
    data : wdata
  });
})


app.get("/cont-ser", (req, res) => {
  res.set({
      "Allow-access-Allow-Origin": '*'
  })
  return res.render('cont.ejs',{
    mip : mip,
    userN : userN,
    data : wdata
  });
})

app.get("/img-build-ser", (req, res) => {
  res.set({
      "Allow-access-Allow-Origin": '*'
  })
  return res.render('image_build.ejs',{
    mip : mip,
    userN : userN,
    data : wdata
  });
})

app.get("/vol-ser", (req, res) => {
  res.set({
      "Allow-access-Allow-Origin": '*'
  })
  return res.render('vol_ser.ejs',{
    mip : mip,
    userN : userN,
    data : wdata
  });
})

app.get("/net-ser", (req, res) => {
  res.set({
      "Allow-access-Allow-Origin": '*'
  })
  return res.render('net.ejs',{
    mip : mip,
    userN : userN,
    data: wdata
  });
})

app.post("/login", (req, res, next) => {
  User.find({ email: req.body.email })
    .exec()
    .then(user => {
      if (user.length < 1) {
        console.log('Auth Failed')
      }
      bcrypt.compare(req.body.password, user[0].password, (err, result) => {
        if (err) {
          console.log('Auth Failed');
        }
        if (result) {
          const token = jwt.sign(
            {
              email: user[0].email,
              userId: user[0]._id
            },
            "" +process.env.JWT_KEY,
            {
                expiresIn: "1h"
            }
          );
        
            console.log('Auth successful');
            console.log(token);
            userN=req.body.username;
            res.render('option', { title: 'Developer Records', user: userN})
        }
        
      });
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({
        error: err
      });
    });
    
});


app.post("/pull", (req, res, next) => {
  mip=req.body.machineip;
  console.log("from the main ser ",mip)  
  res.render('pull.ejs', { 
    mip: mip,
    userN : userN,
   })
});

// app.post("/owned.ejs", (req, res, next) => {
//   User.find({}).select("machineip").exec(function(err, data){
//     if(err) throw err;
//     res.render('owned', { title: 'User Records', records: data })
//   })
// });

app.post("/pull", (req, res, next) => {
  User.find({}).select("machineip").exec(function(err, data){
    if(err) throw err;
    res.render('pull', { title: 'User Records', records: data })
  })
})
// app.post("/img-ser", (req, res) => {
//   const dim = req.body.dockerimagename;
//   const duser = req.body.dockerusername;
//   const dpass = req.body.dockerpassword;
//   const dver = req.body.dockerversion;
//   console.log(dim);
//   console.log(duser);
//   console.log(dpass);
//   console.log(dver);
// })

 

//--> Image Service API's <----

app.post("/img-ser",(req,res)=>
{
   var subSer= req.body.subSer;
   var apiUrl = "http://"+mip+"/cgi-enabled/index.py?service=img&subser=";
   
   if(subSer  === "list")
   {
        apiUrl=apiUrl+"list"
        
        console.log(apiUrl);

        axios.get(apiUrl).then(
          response => 
          {
            wdata = response.data;
            console.log(wdata);
            
            res.render('img', {userN: userN, mip : mip, data : wdata })
          }
        ).catch(
          err=>{
            console.log("Error in Fetching the Data from the API")
          }
        ) 
   }

   else if(subSer === "pull")
   {
    var imgName = req.body.dockerimagename;
    apiUrl=apiUrl+"pull&img_name="+imgName;

        
    console.log(apiUrl);

    axios.get(apiUrl).then(
      response => 
      {
        wdata = response.data;
        console.log(wdata);
        
        res.render('img', {userN: userN, mip : mip, data : wdata })
      }
    ).catch(
      err=>{
        console.log("Error in Fetching the Data from the API")
      }
    ) 
   }

   else if(subSer === "rmbyid")
   {
    var imgid = req.body.imgid;
    apiUrl=apiUrl+"rm_img_by_id&img_id="+imgid;

        
    console.log(apiUrl);

    axios.get(apiUrl).then(
      response => 
      {
        wdata = response.data;
        console.log(wdata);
        
        res.render('img', {userN: userN, mip : mip, data : wdata })
      }
    ).catch(
      err=>{
        console.log("Error in Fetching the Data from the API")
      }
    ) 
   }

   else if(subSer === "hist")
   {
    var imgid = req.body.imgid;
    apiUrl=apiUrl+"img_hist&img_id="+imgid;

        
    console.log(apiUrl);

    axios.get(apiUrl).then(
      response => 
      {
        wdata = response.data;
        console.log(wdata);
        
        res.render('img', {userN: userN, mip : mip, data : wdata })
      }
    ).catch(
      err=>{
        console.log("Error in Fetching the Data from the API")
      }
    )
   }

   else if(subSer === "insp")
   {
    var imgid = req.body.imgid;
    apiUrl=apiUrl+"img_inspect&img_id="+imgid;

        
    console.log(apiUrl);

    axios.get(apiUrl).then(
      response => 
      {
        wdata = response.data;
        console.log(wdata);
        
        res.render('img', {userN: userN, mip : mip, data : wdata })
      }
    ).catch(
      err=>{
        console.log("Error in Fetching the Data from the API")
      }
    )
   }
})

// Container API service

app.post("/cont-ser",(req,res)=>
{
   var subSer= req.body.subSer;
   var apiUrl = "http://"+mip+"/cgi-enabled/index.py?service=cont&subser=";
   
   if(subSer  === "list")
   {
        apiUrl=apiUrl+"ls"
        
        console.log(apiUrl);

        axios.get(apiUrl).then(
          response => 
          {
            wdata = response.data;
            console.log(wdata);
            
            res.render('cont', {userN: userN, mip : mip, data : wdata })
          }
        ).catch(
          err=>{
            console.log("Error in Fetching the Data from the API")
          }
        ) 
   }

   else if(subSer === "insp")
   {
     var contName=req.body.contName;
    apiUrl=apiUrl+"inspect_by_name&cont_name="+contName;
        
    console.log(apiUrl);

    axios.get(apiUrl).then(
      response => 
      {
        wdata = response.data;
        console.log(wdata);
        
        res.render('cont', {userN: userN, mip : mip, data : wdata })
      }
    ).catch(
      err=>{
        console.log("Error in Fetching the Data from the API")
      }
    ) 
   }

   else if(subSer === "deploy")
   {
     var inPort=req.body.intPort;
     var outPort=req.body.outPort;
     var imgName = req.body.imgName;
     var contName = req.body.contName;



    apiUrl=apiUrl+"deploy&in_port="+inPort+"&out_port="+outPort+"&img_name_with_tag="+imgName+"&contName="+contName;
        
    console.log(apiUrl);

    axios.get(apiUrl).then(
      response => 
      {
        wdata = response.data;
        console.log(wdata);
        
        res.render('cont', {userN: userN, mip : mip, data : wdata })
      }
    ).catch(
      err=>{
        console.log("Error in Fetching the Data from the API")
      }
    ) 
   }

   else if(subSer === "stop")
   {
    
     var contName = req.body.contName;

     apiUrl=apiUrl+"stop&cont_name="+contName;
        
    console.log(apiUrl);

    axios.get(apiUrl).then(
      response => 
      {
        wdata = response.data;
        console.log(wdata);
        
        res.render('cont', {userN: userN, mip : mip, data : wdata })
      }
    ).catch(
      err=>{
        console.log("Error in Fetching the Data from the API")
      }
    ) 
   }

   else if(subSer === "start")
   {
     var contName = req.body.contName;

    apiUrl=apiUrl+"start&cont_name="+contName;
        
    console.log(apiUrl);

    axios.get(apiUrl).then(
      response => 
      {
        wdata = response.data;
        console.log(wdata);
        
        res.render('cont', {userN: userN, mip : mip, data : wdata })
      }
    ).catch(
      err=>{
        console.log("Error in Fetching the Data from the API")
      }
    ) 
   }

   else if(subSer === "log")
   {
     var contName = req.body.contName;
    apiUrl=apiUrl+"log&cont_name="+contName;
        
    console.log(apiUrl);

    axios.get(apiUrl).then(
      response => 
      {
        wdata = response.data;
        console.log(wdata);
        
        res.render('cont', {userN: userN, mip : mip, data : wdata })
      }
    ).catch(
      err=>{
        console.log("Error in Fetching the Data from the API")
      }
    ) 
   }


  })


  //-- Network Service ---

  app.post("/net-ser",(req,res)=>
{
   var subSer= req.body.subSer;
   var apiUrl = "http://"+mip+"/cgi-enabled/index.py?service=net&subser=";
   
   if(subSer  === "ls")
   {
        apiUrl=apiUrl+"ls"
        
        console.log(apiUrl);

        axios.get(apiUrl).then(
          response => 
          {
            wdata = response.data;
            console.log(wdata);
            
            res.render('net', {userN: userN, mip : mip, data : wdata })
          }
        ).catch(
          err=>{
            console.log("Error in Fetching the Data from the API")
          }
        ) 
   }

   else if(subSer  === "create")
   {
      var subnet = req.body.subnet;
      var net_name = req.body.netName; 

        apiUrl=apiUrl+"create&subnet="+subnet+"&net_name="+net_name;
        
        console.log(apiUrl);

        axios.get(apiUrl).then(
          response => 
          {
            wdata = response.data;
            console.log(wdata);
            
            res.render('net', {userN: userN, mip : mip, data : wdata })
          }
        ).catch(
          err=>{
            console.log("Error in Fetching the Data from the API")
          }
        ) 
   }

   else if(subSer  === "deploy")
   {
      var ip = req.body.ip;
      var netName =  req.body.netName;
      var inPort = req.body.inPort;
      var outPort = req.body.outPort;
      var contName = req.body.contName;
      var imgNameWithTag = req.body.imgNameWithTag;

        apiUrl=apiUrl+"deploy_with_static&ip="+ip+"&net_name="+netName+"&in_port="+inPort+"&out_port="+outPort+"&cont_name="+contName+"&img_name_with_tag="+imgNameWithTag;
        
        console.log(apiUrl);

        axios.get(apiUrl).then(
          response => 
          {
            wdata = response.data;
            console.log(wdata);
            
            res.render('net', {userN: userN, mip : mip, data : wdata })
          }
        ).catch(
          err=>{
            console.log("Error in Fetching the Data from the API")
          }
        ) 
   }

   else if(subSer  === "capIP")
   {
      var contName = req.body.contName;
      
      apiUrl=apiUrl+"cap_ip&cont_name="+contName;
        
        console.log(apiUrl);

        axios.get(apiUrl).then(
          response => 
          {
            wdata = response.data;
            console.log(wdata);
            
            res.render('net', {userN: userN, mip : mip, data : wdata })
          }
        ).catch(
          err=>{
            console.log("Error in Fetching the Data from the API")
          }
        ) 
   }
   
   
  })

console.log("Listening on PORT 8080");