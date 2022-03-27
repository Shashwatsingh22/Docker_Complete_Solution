var express = require("express");
var routes = express.Router();
var mip;
var userN;
var wdata;
routes.get("/net-ser", (req, res) => {
    res.set({
        "Allow-access-Allow-Origin": '*'
    })
    return res.render('net.ejs',{
      mip : mip,
      userN : userN,
      data: wdata
    });
  })
routes.post("/net-ser",(req,res)=>
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
  module.exports = routes;