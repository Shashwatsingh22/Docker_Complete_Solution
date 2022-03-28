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
    var cont_id;

    switch(action)
    {
        case 'list':
            cmd = 'sudo docker ps';
            runCmd(cmd,res);
            break;
        
        
        case 'inspect_by_id':
            cont_id = req.body.cont_id;
            cmd = 'sudo docker container inspect '+ cont_id;
            runCmd(cmd,res);
            break;
        
        case 'inspect_by_name':
            cont_name=req.body.cont_name;
            cmd = 'sudo docker container inspect '+cont_name;
            runCmd(cmd,res);
            break; 
        
        case 'log':
            cont_name=req.body.cont_name;
            const lines =  req.body.last_line;
        
            cmd = 'sudo docker container logs ';
            if(lines)  cmd = cmd + '--tail '+ lines + ' '+cont_name;
            else cmd = cmd + cont_name;
        
            runCmd(cmd,res);
            break;
        
        default:

    }
})

routes.post('/change',(req,res,next)=>
{
    const action = req.body.action;
    var cmd;
    var cont_name;
    
    switch(action)
    {
        case 'deploy':
            const in_port = req.body.in_port;
            const out_port = req.body.out_port;
            const img_name_with_ver = req.body.img_name_with_ver;
            const tag = req.body.tag;

            cmd = 'sudo docker run -dit --name '+tag+' -p '+out_port+':'+in_port+' '+img_name_with_ver;
            runCmd(cmd,res)
            break;
        
        case 'stop':
            cont_name = req.body.cont_name;
            cmd='sudo docker container stop '+cont_name;
            runCmd(cmd,res);
            break;
        
        case 'start':
            cont_name = req.body.cont_name;
            cmd='sudo docker container start '+cont_name;
            runCmd(cmd,res);    
            break;
        
        default:
            res.status(200).json({
                output : "Wrong Action",
            })    
    }
})


module.exports=routes;