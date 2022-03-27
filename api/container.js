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
            const cmd = 'docker ps';
            runCmd(cmd,res);
        
        case 'inspect_by_id':
            const cont_id = req.body.cont_id;
            cmd = 'docker container inspect '+ cont_id;
            runCmd(cmd,res);
        
        case 'inspect_by_name':
            const cont_name=req.body.cont_name;
            cmd = 'docker container inspect '+cont_name;
            runCmd(cmd,res); 
        
        case 'log':
            cont_name=req.body.cont_name;
            const lines =  req.body.last_line;
        
            cmd = 'docker container logs ';
            if(lines)  cmd = cmd + '--tail '+ lines + ' '+cont_name;
            else cmd = cmd + cont_name;
        
            runCmd(cmd,res);
    }
})

routes.post('/change',(req,res,next)=>
{
    const action = req.body.action;

    switch(action)
    {
        case 'deploy':
            const in_port = req.body.in_port;
            const out_port = req.body.out_port;
            const img_name_with_ver = req.body.img_name_with_ver;
            const tag = req.body.tag;

            const cmd = 'docker run -dit --name '+tag+' -p '+out_port+':'+in_port+' '+img_name_with_ver;
            runCmd(cmd,res)
        
        case 'stop':
            const cont_name = req.body.cont_name;
            cmd='docker container stop '+cont_name;
            runCmd(cmd,res);
        
        case 'start':
            cont_name = req.body.cont_name;
            cmd='docker container start '+cont_name;
            runCmd(cmd,res);    
    }
})


module.exports=routes;