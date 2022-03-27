var express = require("express");
var routes = express.Router();
const User = require('../models/user');
const bcrypt = require('bcrypt');
var jwt = require('jsonwebtoken');
const mongoose = require('mongoose');
routes.get("/sign_up", (req, res) => {
    res.set({
        "Allow-access-Allow-Origin": '*'
    })
    return res.redirect('/pages/signup.html');
  })
routes.post("/sign_up", (req, res, next) => {
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
module.exports=routes;