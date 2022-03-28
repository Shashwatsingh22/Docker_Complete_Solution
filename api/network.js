const express = require('express');
const util = require('util');
const exec = util.promisify(require('child_process').exec);

const routes = express.Router();

async function runCmd(cmd,res)
{
    try{
        const run = await exec(cmd);
        
        res.status(200).json({
            output : run['stdout'],
        })
    }
    catch(err){
        console.log(err);
    }
}


routes.get('/view',(req,res,next)=>
{
    const action = req.body.action;
    var cmd;
    var cont_name;

    switch(action)
    {
        case 'list':
            cmd = 'sudo docker network ls';
            runCmd(cmd,res);
            break;
        
        case 'cap_ip':
            cont_name=req.body.cont_name;
            cmd= "sudo docker inspect -f"+"'{{"+"range.NetworkSettings.Networks"+"}}{{"+".IPAddress}}{{end"+"'}}' "+cont_name;
            runCmd(cmd,res);
            break;
        
        default:
            res.status(200).json({
                output : "Wrong Action"
            })    
    }
})

routes.get('/change',async(req,res,next)=>
{
    const action = req.body.action;
    var cmd; 
    switch(action)
    {
        case 'create_subnet':
            const subnet =  req.body.subnet;
            const tag = req.body.tag;
            cmd = 'sudo docker network crate --subnet='+subnet+" "+tag;
            runCmd(cmd,res)
            break;
        
        case 'deploy_with_static_id':
            const ip = req.body.ip;
            const net_name = req.body.net_name;
            const in_port = req.body.in_port;
            const out_port = req.body.out_port;
            const cont_name = req.body.cont_name;
            const img_name_with_tag = req.body.img_name_with_tag;
            cmd="sudo docker run -dit --net "+net_name+" --ip "+ip+" -p "+out_port+":"+in_port+" --name "+cont_name+" "+img_name_with_tag;
            runCmd(cmd.replace,res);
            break;
        
        default:
            res.status(200).json({
                output : "Wong Action!",
            })
    }
})


module.exports=routes;