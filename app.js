const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan');

const app = express();

//Routes
const contSer = require('./api/container')
const imgSer = require('./api/img')
const netWorkSer = require('./api/network')
const dockerFileSer =  require('./api/dockerFileSer');
const res = require('express/lib/response');

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
// app.use('/',(req,res,next)=>{
//     res.status(200).json({
//         msg : "Docker API service Started Bose 😎!",
//         paths : {
//               container_Services : "/contSer",
//               image_Services : "/imgSer",
//               network_Services : "/netSer",
//               dockerFile_Services : "/dockerFileSer"
//                      }
//     })
// })

//Container Service
app.use('/contSer', contSer);

//Image Service
app.use('/imgSer',imgSer);

//Network Service
app.use('/netSer',netWorkSer);

//DockerFile Serivces
app.use('/dockFileSer',dockerFileSer);

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