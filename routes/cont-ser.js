var express = require("express");
var routes = express.Router();
var mip;
var userN;
var wdata;
routes.get("/cont-ser", (req, res) => {
    res.set({
        "Allow-access-Allow-Origin": '*'
    })
    return res.render('cont.ejs',{
      mip : mip,
      userN : userN,
      data : wdata
    });
})
routes.post("/cont-ser",(req,res)=>
{
   var subSer= req.body.subSer;
   var apiUrl = "http://"+mip+"/cgi-enabled/index.py?service=cont&subser=";
   
   if(subSer  === "list")
   {
        apiUrl=apiUrl+"ls"
        
        console.log(apiUrl);

        axios.get(apiUrl).then(
          response => 
          {
            wdata = response.data;
            console.log(wdata);
            
            res.render('cont', {userN: userN, mip : mip, data : wdata })
          }
        ).catch(
          err=>{
            console.log("Error in Fetching the Data from the API")
          }
        ) 
   }

   else if(subSer === "insp")
   {
     var contName=req.body.contName;
    apiUrl=apiUrl+"inspect_by_name&cont_name="+contName;
        
    console.log(apiUrl);

    axios.get(apiUrl).then(
      response => 
      {
        wdata = response.data;
        console.log(wdata);
        
        res.render('cont', {userN: userN, mip : mip, data : wdata })
      }
    ).catch(
      err=>{
        console.log("Error in Fetching the Data from the API")
      }
    ) 
   }

   else if(subSer === "deploy")
   {
     var inPort=req.body.intPort;
     var outPort=req.body.outPort;
     var imgName = req.body.imgName;
     var contName = req.body.contName;



    apiUrl=apiUrl+"deploy&in_port="+inPort+"&out_port="+outPort+"&img_name_with_tag="+imgName+"&contName="+contName;
        
    console.log(apiUrl);

    axios.get(apiUrl).then(
      response => 
      {
        wdata = response.data;
        console.log(wdata);
        
        res.render('cont', {userN: userN, mip : mip, data : wdata })
      }
    ).catch(
      err=>{
        console.log("Error in Fetching the Data from the API")
      }
    ) 
   }

   else if(subSer === "stop")
   {
    
     var contName = req.body.contName;

     apiUrl=apiUrl+"stop&cont_name="+contName;
        
    console.log(apiUrl);

    axios.get(apiUrl).then(
      response => 
      {
        wdata = response.data;
        console.log(wdata);
        
        res.render('cont', {userN: userN, mip : mip, data : wdata })
      }
    ).catch(
      err=>{
        console.log("Error in Fetching the Data from the API")
      }
    ) 
   }

   else if(subSer === "start")
   {
     var contName = req.body.contName;

    apiUrl=apiUrl+"start&cont_name="+contName;
        
    console.log(apiUrl);

    axios.get(apiUrl).then(
      response => 
      {
        wdata = response.data;
        console.log(wdata);
        
        res.render('cont', {userN: userN, mip : mip, data : wdata })
      }
    ).catch(
      err=>{
        console.log("Error in Fetching the Data from the API")
      }
    ) 
   }

   else if(subSer === "log")
   {
     var contName = req.body.contName;
    apiUrl=apiUrl+"log&cont_name="+contName;
        
    console.log(apiUrl);

    axios.get(apiUrl).then(
      response => 
      {
        wdata = response.data;
        console.log(wdata);
        
        res.render('cont', {userN: userN, mip : mip, data : wdata })
      }
    ).catch(
      err=>{
        console.log("Error in Fetching the Data from the API")
      }
    ) 
   }


  })
  module.exports = routes;