var express = require("express");
var routes = express.Router();
routes.get("/serverless", (req, res) => {
    res.set({
        "Allow-access-Allow-Origin": '*'
    })
    res.render('serverless.ejs');
});
routes.post("/serverless", (req, res) => {
    res.render('serverless.ejs',{});
});
module.exports=routes;