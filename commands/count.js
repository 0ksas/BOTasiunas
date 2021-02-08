module.exports = {
    name: 'count',
    description: "Outputs the count of specified group",
    execute(message, args) {
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
        let roleId = message.guild.roles.cache.find(role => role.name === roleName);

        if (args.length == 0) {
            message.channel.send(user + " Count of users in the server: " + message.guild.memberCount);
        } else if (roleId) {
            //This part is obviously broken
            //It used to work correctly is the past Discord.js versions.
            //let count = message.guild.members.cache.filter(m => m.roles.cache.find(r => r.name === roleName)).size;
            //message.channel.send(user + " Count of users in " + roleName + ": "+count)
        } else {
            message.channel.send(user + " No such role found.");
        }

    }
}