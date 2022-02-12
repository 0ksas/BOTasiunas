module.exports = {
    name: 'remove',
    description: "Command to request removal from a group",
    execute(client, message, args) {
        let user = message.member;
        user = user.toString();
        let tempRole;
        let roleName;
        for (let i = 1; i <= 5; i++) {
            if (tempRole = message.member.roles.cache.find(role => role.name === (i + " grupė"))) {
                roleName = (i + " grupė");
                message.member.roles.remove(tempRole.id);
                message.channel.send(this.constants.removed(user, roleName));
                return;
            }
        }
        message.channel.send(this.constants.doNotBelong(user))
    },

    constants: {
        removed(user, roleName) {
            return `${user}, you have been removed from: ${roleName}`;
        },
        doNotBelong(user) {
            return `${user} You do not belong to any group.`;
        }
    }
}