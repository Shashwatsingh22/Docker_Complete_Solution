var express = require("express");
var routes = express.Router();
const User = require('../models/user');
const bcrypt = require('bcrypt');
var jwt = require('jsonwebtoken');
routes.get("/login", (req, res) => {
    res.set({
        "Allow-access-Allow-Origin": '*'
    })
    return res.redirect('/pages/login.html');
});
routes.post("/login", (req, res, next) => {
  User.find({ email: req.body.email })
    .exec()
    .then(user => {
      if (user.length < 1) {
        console.log('Auth Failed');
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
module.exports=routes;