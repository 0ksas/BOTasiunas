module.exports = {
    name: 'remove',
    description: "Command to request removal from a group",
    execute(message, args) {
        let user = message.member;
        user = user.toString();
        let tempRole
        let roleName;
        let adminId = message.guild.roles.cache.find(role => role.name ==="Admin");
        let modId = message.guild.roles.cache.find(role => role.name ==="Seniūnas");
        for (let i = 1; i <= 5; i++) {
            if (tempRole = message.member.roles.cache.find(role => role.name === (i + " grupė"))) {
                roleName = (i + " grupė");
                message.member.roles.remove(tempRole.id);
                message.channel.send(`${user} has been removed from: ${roleName}`);
                return;
            }
        }
        message.channel.send(`${user} You do not belong to any group.`)
    }
}