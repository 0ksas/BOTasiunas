const Discord = require('discord.js');
const Credentials = require('./Credentials/credentials.js')

const client = new Discord.Client();

const prefix = '!';
const mistakePrefix = 'Ą';

const fs = require('fs');

client.commands = new Discord.Collection();

const commandFiles = fs.readdirSync('./commands/').filter(file => file.endsWith('.js'));
for (const file of commandFiles) {
    const command = require(`./commands/${file}`);

    client.commands.set(command.name, command);
}
client.once('ready', () => {
    console.log('PS bot is online!');
});

client.on('message', message => {
    if (message.author.bot) return;
    else if (message.content.startsWith(prefix) || message.content.startsWith(mistakePrefix)) {


        const args = message.content.slice(prefix.length).split(/ +/);
        const command = args.shift().toLowerCase();

        switch (command) {
            case 'ping':
                client.commands.get('ping').execute(message, args);
                break;
            case 'help':
                client.commands.get('help').execute(message, args);
                break;
            case 'grupė':
                client.commands.get('grupė').execute(message, args);
                break;
            case 'remove':
                client.commands.get('remove').execute(message, args)
                break;
            case 'count':
                client.commands.get('count').execute(message, args);
                break;
            case 'valaitis':
                client.commands.get('valaitis').execute(message, args);
                break;
            case 'kašuba':
                client.commands.get('kasuba').execute(message, args)
                break;
            case 'litvinas':
                client.commands.get('litvinas').execute(message, args)
                break;
            case 'birštunas':
                client.commands.get('birstunas').execute(message, args)
                break;
            case 'hornyteen':
                client.commands.get('hornyTeen').execute(message, args)
                break;
            case 'manifest':
                client.commands.get('manifest').execute(message, args)
                break;
            case 'viaceslav':
                client.commands.get('viaceslav').execute(message, args)
                break;
            case 'sauliunas':
                client.commands.get('sauliunas').execute(message, args)
                break;
            case 'petrauskas':
                client.commands.get('petrauskas').execute(message, args)
                break;
        }
    }
})


const credentials = new Credentials();
client.login(credentials.login);