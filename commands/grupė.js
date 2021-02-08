module.exports = {
    name: 'grupė',
    description: "Assigns a member to the selected group",
    execute(message, args) {
        let user = message.member;
        user = user.toString();

        let groupName = args + " grupė"
        let roleObject = message.guild.roles.cache.find(role => role.name === groupName)

        if (roleObject === undefined) {
            message.channel.send(user + " No such group exists.")
            return;
        }

        let doesBelongToGroup = false
        for (let i = 1; i <= 5; i++) {
            if (tempRole = message.member.roles.cache.find(role => role.name === (i + " grupė"))) {
                doesBelongToGroup = true;
            }
        }

        if (message.member.roles.cache.find(role => role.name === groupName)) {
            message.channel.send(user + ' You already belong in that group.');
        }
        else if (doesBelongToGroup) {
            message.channel.send(user +' You can only belong in one group.');
        }
        else {
                message.member.roles.add(roleObject).catch(console.error);
                message.channel.send(user + " has been added to " + args + " grupė");   
        }
        
    }
}






