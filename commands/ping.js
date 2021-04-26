module.exports = {
    name: 'ping',
    description: "this is a ping command",
    async execute(message, args) {
        message.channel.send('pong!');
    }
}