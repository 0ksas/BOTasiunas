module.exports = {
    name: 'help',
    description: "Outputs all of the help commands for guild messages.",
    execute(message, args) {
        message.channel.send(
            '!help - see all commands\n' +
            '!grupė [1-5] - adds you to selected group\n' +
            '!remove - removes you from your group.\n' +
            '!count [role] - find out how many users are in that role (empty - claculates users in the whole server).\n' +
            '!topmessage - find the most reacted to message on that channel'
        )
    }
}