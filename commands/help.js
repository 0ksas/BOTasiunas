const { constants } = require("./kašuba")

module.exports = {
    name: 'help',
    description: "Outputs all of the help commands for guild messages.",
    execute(client, message, args) {
        message.channel.send(this.constants.helpMessage(message.member))
    },

    constants: {
        helpMessage(user) {
            return user.toString() + '\n' +
                '!help - see all commands\n' +
                '!group [1-5] - adds you to selected group\n' +
                '!remove - removes you from your group.\n' +
                '!count [role] - find out how many users are in that role (empty - claculates users in the whole server).\n' +
                '!topmessage - find the most reacted to message on that channel';
        },
    }
}