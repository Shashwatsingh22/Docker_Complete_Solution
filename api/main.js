const express = require('express');
const util = require('util');
const exec = util.promisify(require('child_process').exec);

const routes = express.Router();


routes.post('/change',async(req,res,next)=>
{
    const action=req.body.action;

    switch(action)
    {
        case 'play':
            //Setting Up the Env Variable
            let cmd = 'cat ../cred >> ../.basrc; echo "Successfully SetUp the Env Variable"';
            try{
                const run = await exec(cmd);
                
                res.status(200).json({
                    output : run['stdout'],
                })
            }
            catch(err){
                console.log(err);
            }
            //runCmd(cmd,res);

            //Updating the host name
            const host = 'tag_Name'+req.body.host;

             var fs = require('fs')
              const fileName="./playBooks/docker-complete-setup.yml"
             fs.readFile(fileName, 'utf8', function (err,data) {
             if (err) {
                  return console.log(err);
             }
             var result = data.replace(/tag_Name*/g, host);

              fs.writeFile(fileName, result, 'utf8', function (err) {
                 if (err) return console.log(err);
                });
           });

           //Running the Script
            cmd='ansible-playbook ./playBooks/docker-complete-setup.yml >> ./temp/showOnConsole; cat showOnCosole;';
            try{
                const run = await exec(cmd);
                
                res.status(200).json({
                    output : run['stdout'],
                })
            }
            catch(err){
                console.log(err);
            }
            //runCmd(cmd,res);

    }

})


module.exports=routes;