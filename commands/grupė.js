module.exports = {
    name: 'grupė',
    description: "Assigns a member to the selected group",
    execute(client, message, args) {
        let user = message.member;
        user = user.toString();

        //TODO: make this configurable
        let groupName = args + " grupė"
        let roleObject = message.guild.roles.cache.find(role => role.name === groupName)

        if (roleObject === undefined) {
            message.channel.send(this.constants.groupDoesntExits(user))
            return;
        }

        let doesBelongToGroup = false
        for (let i = 1; i <= 5; i++) {
            if (tempRole = message.member.roles.cache.find(role => role.name === (i + " grupė"))) {
                doesBelongToGroup = true;
            }
        }

        if (message.member.roles.cache.find(role => role.name === groupName)) {
            message.channel.send(this.constants.groupAlreadyBelong(user));
        }
        else if (doesBelongToGroup) {
            message.channel.send(this.constants.groupBelongInGroup(user));
        }
        else {
                message.member.roles.add(roleObject).catch(console.error);
            message.channel.send(this.constants.groupAddedSuccessfully(user, args));   
        }
        
    },

    constants: {
        groupDoesntExits(user) {
            return user + ' No such group exists.';
        },
        groupAlreadyBelong(user) {
            return user + ' You already belong in that group.';
        },
        groupBelongInGroup(user) {
            return user + ' You can only belong in one group.'
        },
        groupAddedSuccessfully(user, args) {
            return user + ' has been added to ' + args + ' group.';
        }
    }
}






