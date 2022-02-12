module.exports = {
    name: 'repo',
    description: "Repository link",
    async execute(client, message, args) {
        let user = message.member.toString();
        message.channel.send(user + ' https://github.com/0ksas/BOTasiunas');
    }
}