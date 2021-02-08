module.exports = {
    name: 'hornyTeen',
    description: "To silence the horny teen",
    execute(message, args) {

        const fs = require('fs');
        const dir = './Images/horny_teen';
        let count;
        fs.readdir(dir, (err, files) => {
            count = files.length
            console.log(count)
            count = Math.floor(Math.random() * Math.floor(parseInt(count)));
            console.log(count)
            message.channel.send("", { files: ["./Images/horny_teen/" + count + ".jpg"] });
        });


        

        
    }
}