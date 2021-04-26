const Discord = require('discord.js');
const Credentials = require('./Credentials/credentials.js')

const client = new Discord.Client();

const prefix = '!';
const mistakePrefix = 'Ą';

const fs = require('fs');

client.commands = new Discord.Collection();

const messages = new Array();
const heroedUsers = new Array();

const commandFiles = fs.readdirSync('./commands/').filter(file => file.endsWith('.js'));
for (const file of commandFiles) {
    const command = require(`./commands/${file}`);

    client.commands.set(command.name, command);
}
client.once('ready', () => {
    console.log('PS bot is online!');
});

client.on('ready', () => {
    client.setInterval(() => {
        console.log("Checking")

        messages.forEach(message => {
            let currentTime = new Date();
            let messageTime = message.createdAt;
            if ((currentTime - messageTime) > 3600000) {
                let index = messages.indexOf(message)
                if (index > -1) {
                    messages.splice(index, 1)
                }
                return;
            }

            heroedUsers.forEach(event => {
                if ((currentTime - event.time) > 43200000) {
                    let role = message.guild.roles.cache.find(role => role.name === "Hero of the Village");
                    event.member.roles.remove(role.id);
                    let index = heroedUsers.indexOf(event.member)
                    if (index > -1) {
                        heroedUsers.splice(index, 1)
                    }
                }
            })

            let reactionsList = message.reactions
            let reactions = reactionsList.cache.find(r => r.emoji.name == "Hero_of_the_Village")
            if (reactions != undefined) {
                if (reactions.count > Math.floor(message.guild.memberCount / 10)) {
                    console.log("Heroed of the villaged")
                    let role = message.guild.roles.cache.find(role => role.name === "Hero of the Village")
                    message.member.roles.add(role).catch(console.error)
                    heroedUsers.push({
                        member: message.member,
                        time: currentTime
                    })
                    console.log(new Date())

                    let index = messages.indexOf(message)
                    if (index > -1) {
                        messages.splice(index, 1)
                    }
                }
                
            }
        })
    }, 10000)
})

client.on('message', message => {
    messages.push(message)
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
            case 'topmessage':
                client.commands.get('topmessage').execute(message, args)
                break;
        }
    }
})


const credentials = new Credentials();
client.login(credentials.login);