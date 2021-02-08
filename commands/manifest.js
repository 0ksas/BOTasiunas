module.exports = {
    name: 'manifest',
    description: "Evaldo manifestas",
    execute(message, args) {
       if(args.length > 0){
            if(args[0] == "original") message.channel.send("Tai va...", { files: ["./Images/tai_va.mp4"] });
       }else{
              const fs = require('fs');
              fs.readFile('./Images/manifest.txt', (err,data)=>{
                if(err) return;
                message.channel.send(data.toString());
              })
       }
       
    }
}