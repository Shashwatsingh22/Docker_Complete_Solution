const express = require('express');
const routes = express.Router();

function runCmd(cmd,res)
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


routes.get('/view',async(req,res,next)=>
{
    const action = req.body.action;

    switch(action)
    {
        case 'list':
            const cmd = 'docker network ls';
            runCmd(cmd,res);
        
        case 'cap_ip':
            const cont_name=req.body.cont_name;
            cmd= "docker inspect -f"+"'{{"+"range.NetworkSettings.Networks"+"}}{{"+".IPAddress}}{{end"+"'}}' "+cont_name;
            runCmd(cmd,res);
    }
})

routes.get('/change',async(req,res,next)=>
{
    const action = req.body.action;

    switch(action)
    {
        case 'create_subnet':
            const subnet =  req.body.subnet;
            const tag = req.body.tag;
            const cmd = 'docker network crate --subnet='+subnet+" "+tag;
            runCmd(cmd,res)
        
        case 'deploy_with_static_id':
            const ip = req.body.ip;
            const net_name = req.body.net_name;
            const in_port = req.body.in_port;
            const out_port = req.body.out_port;
            const cont_name = req.body.cont_name;
            const img_name_with_tag = req.body.img_name_with_tag;
            cmd="sudo docker run -dit --net "+net_name+" --ip "+ip+" -p "+out_port+":"+in_port+" --name "+cont_name+" "+img_name_with_tag;
            runCmd(cmd.replace,res);
    }
})


module.exports=routes;