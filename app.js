const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan');

const app = express();

//Routes
const mainSer = require('./api/main')

//For Logs Managment 
app.use(morgan('dev'))

//For Parsing Body
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());

//Resolving Cors Error 
app.use((req,res,next)=>{
    //Here, we set the Header Mannually
    res.header('Access-Control-Allow-Origin','*') //Here, We can specify the Specific endpoint
    res.header('Access-Control-Allow-Headers','Origin,X-Requested-With,Content-Type,Accept,Authorixation');

    if(req.method==='OPTIONS')
    {
        res.header('Access-Control-Allow-Methods','PUT,POST,PATCH,DELETE,GET');
        return res.status(200).json({});
    }
    next();
})

//Root
app.use('/',(req,res,next)=>{
    res.status(200).json({
        msg : "Docker API service Started Bose 😎!",
        paths : {
              container_Services : "/contser",
              image_Services : "/imgSer",
              network_Services : "/netSer",
              dockerFile_Services : "/dockerFileSer"
                     }
    })
})

//Container Service
app.use('/main', mainSer);

//If Some Error Caused or Wrong Routes
app.use((req,res,next)=>
{
    const error=new Error("Not Found 😥");
    error.status=404;
    next(error);
})

app.use((error,req,res,next)=>{
    res.status(error.status || 500);
    res.json({
      error:{
          message: error.message
      }  
    })
})

module.exports=app;