module.exports = {
    name: 'count',
    description: "Outputs the count of specified group",
    async execute(message, args) {
        const Credentials = require('./../Credentials/credentials.js')
        let user = message.member;
        user = user.toString();
        let roleName = "";

        let i = 0;
        args.forEach(element => {
            if (i == 0) roleName += element
            else {
                roleName = roleName + " " + element
            }
            i++;
        })
        let role = message.guild.roles.cache.find(role => role.name === roleName);

        if (args.length == 0) {
            message.channel.send(user + " Count of users in the server: " + message.guild.memberCount);
        } else if (role) {
            await message.guild.members.fetch(); //gets all of the members into the cache
            let count = message.guild.members.cache.filter(m => m.roles.cache.find(r => r.name === roleName)).size; //filters ones who have the given role in their role collection
            if (count > 40) {
                message.channel.send(user + " Count of users in " + roleName + ": " + count); //sends message
            } else {
                const fetch = require('node-fetch');
                let url = `https://api.tenor.com/v1/search?q=${count}&key=H13UA21L5LHF&limit=1`
                let response = await fetch(url);
                let json = await response.json();
                message.channel.send(json.results[0].url);
            }
            
        } else {
            message.channel.send(user + " No such role found.");
        }

    }
}