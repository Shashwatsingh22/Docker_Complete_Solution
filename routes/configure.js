var express = require("express");
var routes = express.Router();
const User = require('../models/user');
const bcrypt = require('bcrypt');
var userN;
routes.post("/configure", (req, res, next) => {
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
module.exports = routes;