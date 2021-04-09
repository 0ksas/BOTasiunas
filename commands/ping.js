module.exports = {
    name: 'ping',
    description: "this is a ping command",
    async execute(message, args) {
        message.channel.send('pong!');
        const fetch = require('node-fetch');
        fetch('https://localhost:44396/login/admin/8C6976E5B5410415BDE908BD4DEE15DFB167A9C873FC4BB8A81F6F2AB448A918').then(r => r.json()).then(r => console.log(r))
            .catch(err => console.error(err.message));
    }
}