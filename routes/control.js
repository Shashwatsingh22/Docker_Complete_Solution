var express = require("express");
var routes = express.Router();
var mip;
var userN;
var wdata;
routes.get("/control", (req, res) => {
    res.set({
        "Allow-access-Allow-Origin": '*'
    })
    return res.render('control.ejs',{
      mip : mip,
      userN : userN,
      data : wdata
    });
});
module.exports=routes;