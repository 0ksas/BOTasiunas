module.exports = {
    name: 'petrauskas',
    description: "Petrauskas zzzz",
    async execute(client, message, args) {
        const fetch = require('node-fetch');
        let url = `https://api.tenor.com/v1/search?q=sleep&key=H13UA21L5LHF&limit=50`
        let response = await fetch(url);
        let json = await response.json();
        let index = Math.floor(Math.random() * (50 - 0) + 0);
        message.channel.send(json.results[index].url);
    }
}