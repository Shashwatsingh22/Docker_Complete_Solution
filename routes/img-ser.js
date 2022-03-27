const { default: axios } = require("axios");
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
    console.log(mip);
   var apiUrl = "http://"+mip+":3000";
   
   if(subSer  === "list")
   {
        apiUrl += '/imgSer/view';
        
        const data = {
          action : 'list'
        }
        
        console.log(apiUrl);

        const run = async()=>{
          try {
            const res = await axios.get(apiUrl,data);
            console.log(`status: ${res.status}`);
            console.log('Body : ', res.data);
          }catch(err){
            console.log(err);
          }
        }

        // axios.get(apiUrl).then(
        //   response => 
        //   {
        //     wdata = response.data;
        //     console.log(wdata);
            
            res.render('img', {userN: userN, mip : mip, data : wdata })
        //   }
        // ).catch(
        //   err=>{
        //     console.log("Error in Fetching the Data from the API")
        //   }
        // ) 
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