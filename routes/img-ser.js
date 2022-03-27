var express = require("express");
var routes = express.Router();
var mip;
var userN;
var wdata;

routes.get("/img-ser", (req, res) => {
    res.set({
        "Allow-access-Allow-Origin": '*'
    })
    return res.render('img.ejs',{
      mip : mip,
      userN : userN,
      data : wdata
    });
  });
routes.post("/img-ser",(req,res)=>
{
   var subSer= req.body.subSer;
   var apiUrl = "http://"+mip+"/cgi-enabled/index.py?service=img&subser=";
   
   if(subSer  === "list")
   {
        apiUrl=apiUrl+"list"
        
        console.log(apiUrl);

        axios.get(apiUrl).then(
          response => 
          {
            wdata = response.data;
            console.log(wdata);
            
            res.render('img', {userN: userN, mip : mip, data : wdata })
          }
        ).catch(
          err=>{
            console.log("Error in Fetching the Data from the API")
          }
        ) 
   }

   else if(subSer === "pull")
   {
    var imgName = req.body.dockerimagename;
    apiUrl=apiUrl+"pull&img_name="+imgName;

        
    console.log(apiUrl);

    axios.get(apiUrl).then(
      response => 
      {
        wdata = response.data;
        console.log(wdata);
        
        res.render('img', {userN: userN, mip : mip, data : wdata })
      }
    ).catch(
      err=>{
        console.log("Error in Fetching the Data from the API")
      }
    ) 
   }

   else if(subSer === "rmbyid")
   {
    var imgid = req.body.imgid;
    apiUrl=apiUrl+"rm_img_by_id&img_id="+imgid;

        
    console.log(apiUrl);

    axios.get(apiUrl).then(
      response => 
      {
        wdata = response.data;
        console.log(wdata);
        
        res.render('img', {userN: userN, mip : mip, data : wdata })
      }
    ).catch(
      err=>{
        console.log("Error in Fetching the Data from the API")
      }
    ) 
   }

   else if(subSer === "hist")
   {
    var imgid = req.body.imgid;
    apiUrl=apiUrl+"img_hist&img_id="+imgid;

        
    console.log(apiUrl);

    axios.get(apiUrl).then(
      response => 
      {
        wdata = response.data;
        console.log(wdata);
        
        res.render('img', {userN: userN, mip : mip, data : wdata })
      }
    ).catch(
      err=>{
        console.log("Error in Fetching the Data from the API")
      }
    )
   }

   else if(subSer === "insp")
   {
    var imgid = req.body.imgid;
    apiUrl=apiUrl+"img_inspect&img_id="+imgid;

        
    console.log(apiUrl);

    axios.get(apiUrl).then(
      response => 
      {
        wdata = response.data;
        console.log(wdata);
        
        res.render('img', {userN: userN, mip : mip, data : wdata })
      }
    ).catch(
      err=>{
        console.log("Error in Fetching the Data from the API")
      }
    )
   }
})
module.exports=routes;