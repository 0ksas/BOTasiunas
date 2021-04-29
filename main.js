
const Discord = require('discord.js');
const Credentials = require('./Credentials/credentials.js')

const client = new Discord.Client();

const prefix = '!';
const mistakePrefix = 'Ą';
const savePath = './cache/cache.js';
const fs = require('fs');

client.commands = new Discord.Collection();

const messages = new Array();
var heroedUsers = new Array();

const commandFiles = fs.readdirSync('./commands/').filter(file => file.endsWith('.js'));
const dmCommandFiles = fs.readdirSync('./commands_dm/').filter(file => file.endsWith('.js'));
for (const file of commandFiles) {
    const command = require(`./commands/${file}`);

    client.commands.set(command.name, command);
}

for (const file of dmCommandFiles) {
    const command = require(`./commands_dm/${file}`);

    client.commands.set(command.name, command);
}

client.once('ready', () => {
    try {
        const fs = require('fs');
        if (fs.existsSync(savePath)) {
            let text = fs.readFileSync(savePath);
            if(text.length > 0) heroedUsers = JSON.parse(text)
        } else {
            fs.openSync(savePath, 'w')
        }
        
    } catch (err) {

        console.error(err)
    }
    console.log('PS bot is online!');
});

client.on('ready', () => {
    client.setInterval(() => {
        console.log("Checking")
        let currentTime = new Date();

        heroedUsers.forEach(async function (event) {

            if ((currentTime - Date.parse(event.time)) > 43200000) {

                //Getting the guild from the ID
                let guild = await client.guilds.fetch(event.member.guildID)
                let role = guild.roles.cache.find(role => role.name === "Hero of the Village");

                //Getting the members since all of them might not be loaded
                await guild.members.fetch();
                let user = guild.members.cache.find(user => user.id === event.member.userID)

                //Removing the role
                user.roles.remove(role.id);
                let index = heroedUsers.indexOf(event)
                if (index > -1) {
                    heroedUsers.splice(index, 1)
                }
                saveData(savePath, heroedUsers)
            }
        })

        messages.forEach(message => {

            let messageTime = message.createdAt;
            if ((currentTime - messageTime) > 3600000) {
                let index = messages.indexOf(message)
                if (index > -1) {
                    messages.splice(index, 1)
                }
                return;
            }

            

            let reactionsList = message.reactions
            let reactions = reactionsList.cache.find(r => r.emoji.name == "Hero_of_the_Village")
            if (reactions != undefined) {
                try {
                    if (reactions.count >= Math.floor(message.guild.memberCount / 10)) {


                        console.log("Heroed of the villaged")
                        let role = message.guild.roles.cache.find(role => role.name === "Hero of the Village")
                        message.member.roles.add(role).catch(console.error)
                        heroedUsers.push({
                            member: message.member,
                            time: currentTime
                        })
                        saveData(savePath, heroedUsers)
                        console.log(new Date())

                        let index = messages.indexOf(message)
                        if (index > -1) {
                            messages.splice(index, 1)
                        }
                    }
                } catch (err) {
                    console.error(err)
                }
                
                
            }
        })
    }, 10000)
})

client.on('message', message => {
    if (message.author.bot) return;
    if (
        message.channel.type == "dm" &&
        (message.content.startsWith(prefix) ||
            message.content.startsWith(mistakePrefix))
    ) {
        const args = message.content.slice(prefix.length).split(/ +/);
        const command = args.shift().toLowerCase();

        switch (command) {
            case 'anon':
                client.commands.get('anon').execute(message, args, client);
                break;
            case 'help':
                client.commands.get('helpDm').execute(message, args);
                break;
            default:
                message.channel.send("Unrecognised message.")
                break;
        }
        return;
    }

    messages.push(message)
    
    if (message.content.startsWith(prefix) || message.content.startsWith(mistakePrefix)) {
        
        
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
            case 'repo':
                client.commands.get('repo').execute(message, args)
                break; 
        }
    }
})

function saveData(path, array) {
    const fs = require('fs');
    try {
        fs.writeFileSync(path, JSON.stringify(array));
    } catch (err) {
        console.error(err)
    }
}

const credentials = new Credentials();
client.login(credentials.login);