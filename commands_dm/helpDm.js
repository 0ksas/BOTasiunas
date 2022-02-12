module.exports = {
    name: 'helpDm',
    description: "Outputs all of the help commands for direct messages.",
    execute(client, message, args) {
        message.channel.send(this.constants.helpMessage());
    },

    constants: {
        helpMessage() {
            return '!help - see all commands\n' +
                '!anon [server ID (optional)] [channel name] [message]- send an anonymous message to the selected server and channel';
        }
    }
}