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

    switch(action)
    {
        case 'list':
            const cmd = 'sudo docker images';
            runCmd(cmd,res);
        
        case 'inspect_by_id':
            const img_id = req.body.img_id;
            cmd = 'sudo docker image inspect '+ img_id;
            runCmd(cmd,res);
        
        case 'img_hist':
            img_id=req.body.img_id;
            cmd = 'sudo docker image history '+img_id;
            runCmd(cmd,res); 
    }
})

routes.get('/change',(req,res,next)=>
{
    const action = req.body.action;

    switch(action)
    {
        case 'pull':
            const name_with_tag =  req.body.name_with_tag;
            const cmd = 'sudo docker pull '+name_with_tag;
            runCmd(cmd,res)
        
        case 'rm':
            const img_id = req.body.img_id;
            cmd='sudo docker rmi '+img_id;
            runCmd(cmd,res);
    }
})

module.exports=routes;