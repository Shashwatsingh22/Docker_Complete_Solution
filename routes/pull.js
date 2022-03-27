var express = require("express");
var routes = express.Router();

const User = require('../models/user');
const bcrypt = require('bcrypt');
var jwt = require('jsonwebtoken');
var mip;
var userN;
routes.get("/pull", (req, res) => {
    res.set({
        "Allow-access-Allow-Origin": '*'
    })
    res.render('pull.ejs',{mip: mip, userN: userN});
  })
routes.post("/pull", (req, res, next) => {
    mip=req.body.machineip;
    console.log("from the main ser ",mip)  
    res.render('pull.ejs', { 
      mip: mip,
      userN : userN,
     })
});
routes.post("/pull", (req, res, next) => {
    User.find({}).select("machineip").exec(function(err, data){
      if(err) throw err;
      res.render('pull', { title: 'User Records', records: data })
    })
  })
  module.exports=routes;