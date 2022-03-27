var express = require("express");
var routes = express.Router();
var mip;
var userN;
var wdata;

routes.get("/img-build-ser", (req, res) => {
    res.set({
        "Allow-access-Allow-Origin": '*'
    })
    return res.render('image_build.ejs',{
      mip : mip,
      userN : userN,
      data : wdata
    });
  })
  module.exports = routes;