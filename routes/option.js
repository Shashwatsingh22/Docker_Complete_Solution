var express = require("express");
var routes = express.Router();
var mip;
var userN;
var wdata;

routes.get("/option", (req, res) => {
    res.set({
        "Allow-access-Allow-Origin": '*'
    })
    return res.render("option.ejs",{
      mip : mip,
      user : userN,
      data : wdata
    });
});
module.exports=routes;