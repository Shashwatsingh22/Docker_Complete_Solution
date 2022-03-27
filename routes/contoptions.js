var express = require("express");
var routes = express.Router();
var mip;
var userN;
var wdata;
routes.get("/contoptions", (req, res, next) => {
    res.set({
      "Allow-access-Allow-Origin": '*'
  })
  return res.render("contoptions.ejs",{
    mip : mip,
    user : userN,
    data : wdata
  });
  })
  module.exports = routes;