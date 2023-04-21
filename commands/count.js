module.exports = {
    name: 'count',
    description: "Outputs the count of specified group",
    async execute(client, message, args) {
        const Credentials = require('../Credentials/credentials.js')
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
            const fetch = require('node-fetch');
            const credentials = new Credentials();
            let url = `https://api.tenor.com/v1/search?q=${message.guild.memberCount}&key=${credentials.tenor}&limit=1`
            let response = await fetch(url);
            let json = await response.json();
            message.channel.send(json.results[0].url);
        } else if (role) {
            await message.guild.members.fetch(); //gets all of the members into the cache
            let count = message.guild.members.cache.filter(m => m.roles.cache.find(r => r.name === roleName)).size; //filters ones who have the given role in their role collection
            const fetch = require('node-fetch');
            const credentials = new Credentials();
            let url = `https://api.tenor.com/v1/search?q=${count}&key=${credentials.tenor}&limit=1`
            let response = await fetch(url);
            let json = await response.json();
            message.channel.send(json.results[0].url);
        } else {
            message.channel.send(this.constants.countRoleNotFound(user));
        }
    },
    
    constants: {
        countServer(user, count) {
            return user + ' Count of users in the server: ' + count;
        },
        countRole(user, role, count) {
            return user + ' Count of users in ' + role + ": " + count;
        },
        countRoleNotFound(user) {
            return user + ' No such role found.';
        },
    }
}
